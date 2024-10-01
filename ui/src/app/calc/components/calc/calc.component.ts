import {
  animate,
  AnimationBuilder,
  AnimationFactory,
  style,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CalcService } from '../../services/calc.service';

export type Operator = '+' | '-' | '*' | '/';
export type Functions = '=' | 'Escape' | 'Backspace' | 'Enter';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css',
})
export class CalcComponent implements OnInit {
  @ViewChild('display') calcScreen!: ElementRef;

  private animation!: AnimationFactory;
  public value1: string = '';
  public operator: Operator | null = null;
  public value2: string = '';
  private numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
  private operatorKeys = ['+', '-', '*', '/'];
  private functionKeys = ['=', 'Escape', 'Backspace', 'Enter'];
  private allowedKeys = [
    ...this.numericKeys,
    ...this.operatorKeys,
    ...this.functionKeys,
  ];
  public calcByPressingOperator: string | null = null;
  public resultBuffered = false;
  public calcDisplay = signal('0');

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (this.allowedKeys.includes(event.key)) {
      this.runCalculator(event.key);
    }
  }

  constructor(
    private animationBuilder: AnimationBuilder,
    private calcService: CalcService
  ) {}

  ngOnInit(): void {
    this.animation = this.animationBuilder.build([
      style({ opacity: '0' }),
      animate('80ms ease-in', style({ opacity: 1 })),
    ]);
  }

  private triggerAnimation() {
    const player = this.animation.create(this.calcScreen.nativeElement);
    player.play();
  }

  private delete() {}

  private clearCalculator = () => {
    this.value1 = '';
    this.value2 = '';
    this.operator = null;
    this.calcDisplay.set('0');
    this.resultBuffered = false;
  };

  public parseValue(key: string) {
    if (this.operator) {
      this.value2 += key;
      this.calcDisplay.set(String(this.value2));
    } else if (this.resultBuffered) {
      this.value1 = key;
      this.calcDisplay.set(String(this.value1));
      this.resultBuffered = false;
    } else {
      this.value1 += key;
      this.calcDisplay.set(String(this.value1));
    }
  }

  private operatorPressed(key: string) {
    if (key === '-' && !this.value1) {
      this.parseValue('-');
      return;
    }
    if (this.operator) {
      this.performCalculation();
      this.calcByPressingOperator = '-';
    } else {
      this.operator = key as Operator;
    }
    this.triggerAnimation();
  }

  private triggerFunction(key: string) {
    const functionMapper: { [key: string]: any } = {
      '=': this.runCalculator,
      Escape: this.clearCalculator,
      Backspace: this.delete,
      Enter: this.performCalculation,
    };
    functionMapper[key]();
  }

  public runCalculator(key: string) {
    if (this.operatorKeys.includes(key)) {
      this.operatorPressed(key);
    } else if (this.numericKeys.includes(key)) {
      this.parseValue(key);
    } else if (this.functionKeys.includes(key)) {
      this.triggerFunction(key);
    }
  }

  private performCalculation = () => {
    if (!this.operator) {
      console.error('ERROR');
      return;
    }
    this.calcService
      .calculate(this.value1, this.value2, this.operator!)
      .subscribe((res) => {
        this.calcDisplay.set(String(res));
        this.value1 = String(res);
        this.value2 = '';
        if (this.calcByPressingOperator) {
          this.operator = this.calcByPressingOperator as Operator;
        } else {
          this.operator = null;
        }
        this.calcByPressingOperator = null;
        this.resultBuffered = true;
      });
  };
}
