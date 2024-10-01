from pydantic import BaseModel


class UserSignIn(BaseModel):
    username: str
    password: str


class User_RES(BaseModel):
    id: int
    username: str


class AnonymousUser(BaseModel):
    username: str
