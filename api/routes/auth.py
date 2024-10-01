from fastapi import APIRouter, Depends
from sqlmodel import Session

from config.connection import get_session
from services.user import create_anonymous_user
from schemas.common.user import User_RES

auth = APIRouter(tags=["Auth"])


@auth.get("/anonymous_login/")
async def anonymous_login(db: Session = Depends(get_session)) -> User_RES:
    user = create_anonymous_user(db)

    return user
