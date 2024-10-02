import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Operator } from '../components/calc/calc.component';
import { Observable, Subject } from 'rxjs';
import { AuditLog_RES } from '../types/audit_log.type';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  private url = 'http://localhost:8000';
  public opPicker: { [key: string]: any } = {
    '*': 'multiplication',
    '+': 'addition',
    '-': 'subtraction',
    '/': 'division',
  };

  public auditLogStream = new Subject<AuditLog_RES[]>();
  // public auditLogStream$ = this.auditLogStream.asObservable();

  constructor(private http: HttpClient) {}

  public calculate(v1: string, v2: string, operator: Operator) {
    const body = { value_1: Number(v1), value_2: Number(v2) };
    return this.http.post(`${this.url}/calc/${this.opPicker[operator]}/`, body);
  }

  public getAuditLogs() {
    const r = this.http.get<AuditLog_RES[]>(`${this.url}/audit_log/`);
    r.subscribe((res) => {
      this.auditLogStream.next(res);
    });
  }
}
