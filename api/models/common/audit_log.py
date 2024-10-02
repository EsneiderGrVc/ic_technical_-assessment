from sqlmodel import SQLModel, Field
from enum import Enum
from sqlalchemy import func
from datetime import datetime
from models.common.user import User
from sqlmodel import Relationship


# op_enum = Enum(
#     value="OperatorType",
#     names=("ADDITION", "SUBTRACTION", "MULTIPLICATION", "DIVISION"),
# )
class op_enum(Enum):
    ADDITION = ("ADDITION",)
    SUBTRACTION = "SUBTRACTION"
    MULTIPLICATION = "MULTIPLICATION"
    DIVISION = "DIVISION"


class AuditLog(SQLModel, table=True):
    __tablename__ = "audit_log"

    id: int = Field(primary_key=True)
    first_value: float = Field(nullable=False)
    second_value: float = Field(nullable=False)
    operator: op_enum = Field(nullable=False)
    started_at: datetime = Field(default=func.now())
    ended_at: datetime = Field(nullable=False)
    created_by_id: int = Field(nullable=False, foreign_key="user.id")

    created_by: User = Relationship()
