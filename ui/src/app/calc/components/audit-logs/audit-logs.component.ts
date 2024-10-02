import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  GroupCellRendererParams,
} from 'ag-grid-community';
import { CalcService } from '../../services/calc.service';
import { AuditLog_RES } from '../../types/audit_log.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.css',
})
export class AuditLogsComponent implements OnInit {
  public rowData: AuditLog_RES[] = [];
  public gridApi!: GridApi;
  public defaultColDefs: ColDef = { flex: 1 };
  public colDefs: ColDef[] = [
    {
      headerName: 'Value 1',
      field: 'first_value',
    },
    {
      headerName: 'Value 2',
      field: 'second_value',
    },
    {
      headerName: 'Operation',
      field: 'operator',
    },
    {
      headerName: 'Result',
      field: 'result',
    },
    {
      headerName: 'Performed At',
      field: 'started_at',
      cellRenderer: (params: GroupCellRendererParams) => {
        return this.datePipe.transform(params.value, 'M/d/yy, h:mm a');
      },
    },
    {
      headerName: 'Performed by',
      field: 'created_by.username',
    },
  ];
  constructor(private calcService: CalcService, private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.calcService.auditLogStream.subscribe((res) => (this.rowData = res));
    this.calcService.getAuditLogs();
  }

  public onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }
}
