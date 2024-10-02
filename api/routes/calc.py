from typing import Union
from fastapi import APIRouter, Depends
from fastapi.security import HTTPBasic
from sqlmodel import Session

from config.connection import get_session
from schemas.arithmetic.operations import ValueSet
from services.audit_log import create_calc_log
from models.common.audit_log import op_enum

calc_router = APIRouter(tags=["Calculator"])
security = HTTPBasic()


@calc_router.post("/addition/")
async def addition(body: ValueSet, db: Session = Depends(get_session)) -> float:
    create_calc_log(body.value_1, body.value_2, op_enum.ADDITION, db)
    return body.value_1 + body.value_2


@calc_router.post("/subtraction/")
async def subtraction(body: ValueSet, db: Session = Depends(get_session)) -> float:
    create_calc_log(body.value_1, body.value_2, op_enum.SUBTRACTION, db)
    return body.value_1 - body.value_2


@calc_router.post("/multiplication/")
async def multiplication(body: ValueSet, db: Session = Depends(get_session)) -> float:
    create_calc_log(body.value_1, body.value_2, op_enum.MULTIPLICATION, db)
    return body.value_1 * body.value_2


@calc_router.post("/division/")
async def division(
    body: ValueSet, db: Session = Depends(get_session)
) -> Union[float, str]:
    create_calc_log(body.value_1, body.value_2, op_enum.DIVISION, db)
    if body.value_2 != 0:
        return body.value_1 / body.value_2
    return "Not a number."
