from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr

from models.common.audit_log import op_enum
from schemas.common.user import User_RES


# class User_Res(BaseModel):
#     id: int
#     is_active: bool
#     email: EmailStr
#     created_at: datetime
#     updated_at: datetime
#     created_by: Optional["User_Res"]
#     updated_by: Optional["User_Res"]


class AuditLog_Res(BaseModel):
    id: int
    first_value: float
    second_value: float
    operator: op_enum
    started_at: datetime
    ended_at: datetime
    created_by: User_RES
