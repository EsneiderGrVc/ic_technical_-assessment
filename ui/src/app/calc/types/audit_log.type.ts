export interface AuditLog_RES {
  id: number;
  first_value: number;
  second_value: number;
  operator: string;
  started_at: string;
  ended_at: string;
}

export interface User_RES {
  id: number;
  username: string;
}
