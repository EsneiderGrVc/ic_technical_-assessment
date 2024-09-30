from datetime import datetime
from sqlmodel import Session

from models.common.audit_log import AuditLog, op_enum


def create_calc_log(v1, v2, db: Session):
    log = AuditLog()
    log.first_value = v1
    log.second_value = v2
    log.operator = op_enum.ADDITION
    log.ended_at = datetime.now()
    log.created_by_id = 1

    db.add(log)
    db.commit()
