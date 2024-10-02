from typing import Sequence

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from config.connection import get_session


from schemas.common.audit_log import AuditLog_Res

from services.audit_log import delete_audit_logs, get_audit_logs


audit_log = APIRouter(tags=["Audit Logs"])


@audit_log.get("/", status_code=status.HTTP_200_OK)
async def get_logs(db: Session = Depends(get_session)) -> Sequence[AuditLog_Res]:
    result = get_audit_logs(db)
    return result


@audit_log.delete("/", status_code=status.HTTP_201_CREATED)
async def delete_logs(db: Session = Depends(get_session)) -> dict:
    delete_audit_logs(db)
    return {"message": "Audit Logs sucessfuly deleted"}
