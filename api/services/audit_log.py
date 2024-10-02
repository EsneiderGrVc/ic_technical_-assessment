from typing import Union
from datetime import datetime

from sqlalchemy import delete
from sqlmodel import Session, select
from schemas.arithmetic.operations import ValueSet

from models.common.audit_log import AuditLog, op_enum
from models.common.user import User


def create_calc_log(
    params: ValueSet, result: Union[int, None], op: op_enum, db: Session
):
    log = AuditLog()
    log.first_value = params.value_1
    log.second_value = params.value_2
    log.result = result
    log.operator = op
    log.ended_at = datetime.now()
    log.created_by_id = 1

    db.add(log)
    db.commit()


def delete_audit_logs(db: Session):
    stm = delete(AuditLog)
    db.exec(stm)
    db.commit()


def get_audit_logs(db: Session):
    query = select(AuditLog).join(User)
    result = db.exec(query).all()
    return result
