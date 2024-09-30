from typing import Sequence

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from config.connection import get_session
from models.common.audit_log import AuditLog
from models.common.user import User
from schemas.common.audit_log import AuditLog_Res


audit_log = APIRouter(tags=["Audit Logs"])


@audit_log.get("/")
async def get_logs(db: Session = Depends(get_session)) -> Sequence[AuditLog_Res]:
    query = select(AuditLog).join(User)
    result = db.exec(query).all()
    return result
