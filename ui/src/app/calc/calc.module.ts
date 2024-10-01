import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcPageComponent } from './pages/calc-page/calc-page.component';
import { CalcComponent } from './components/calc/calc.component';

@NgModule({
  declarations: [CalcPageComponent, CalcComponent],
  imports: [CommonModule],
  exports: [CalcPageComponent],
})
export class CalcModule {}
