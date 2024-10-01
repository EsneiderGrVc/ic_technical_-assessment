from sqlmodel import SQLModel, Field
from datetime import datetime
from sqlalchemy import func


class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    is_active: bool = Field(default=True, nullable=False)
    username: str = Field(nullable=False)
    created_at: datetime = Field(default=func.now(), nullable=False)
