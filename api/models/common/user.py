from pydantic import BaseModel
from pydantic import EmailStr
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from sqlalchemy import Column, func


class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    is_active: bool = Field(default=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=func.now(), nullable=False)
    created_by_id: int = Field(nullable=False, foreign_key="user.id")
    updated_at: datetime = Field(
        Column(default=func.now(), nullable=False, server_onupdate=func.now())
    )
    updated_by_id: int = Field(nullable=False, foreign_key="user.id")

    created_by: Optional["User"] = Relationship(
        sa_relationship_kwargs={"foreign_keys": "User.created_by_id"}
    )
    updated_by: Optional["User"] = Relationship(
        sa_relationship_kwargs={"foreign_keys": "User.created_by_id"}
    )


class UserSignIn(BaseModel):
    email: EmailStr
    password: str
