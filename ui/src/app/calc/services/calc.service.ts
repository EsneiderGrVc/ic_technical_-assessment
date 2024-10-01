import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operator } from '../components/calc/calc.component';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  private url = 'http://localhost:8000/calc';
  public opPicker: { [key: string]: any } = {
    '*': 'multiplication',
    '+': 'addition',
    '-': 'subtraction',
    '/': 'division',
  };

  constructor(private http: HttpClient) {}

  public calculate(v1: string, v2: string, operator: Operator) {
    const body = { value_1: Number(v1), value_2: Number(v2) };
    return this.http.post(`${this.url}/${this.opPicker[operator]}/`, body);
  }
}
