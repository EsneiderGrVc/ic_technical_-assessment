import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalcPageComponent } from './pages/calc-page/calc-page.component';
import { CalcComponent } from './components/calc/calc.component';
import { AuditLogsComponent } from './components/audit-logs/audit-logs.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [CalcPageComponent, CalcComponent, AuditLogsComponent],
  imports: [CommonModule, AgGridModule],
  providers: [DatePipe],
  exports: [CalcPageComponent],
})
export class CalcModule {}
