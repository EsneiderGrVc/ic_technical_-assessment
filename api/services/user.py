from sqlmodel import Session
from models.common.user import User


def create_anonymous_user(db: Session) -> User:
    user = User()
    user.username = "username"
    db.add(user)
    db.commit()
    db.refresh(user)

    user.username = f"{user.username}_{user.id}"
    db.add(user)
    db.commit()
    return user
