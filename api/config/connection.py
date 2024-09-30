import os
from sqlalchemy.ext.declarative import declarative_base
from sqlmodel import create_engine, Session, SQLModel

db_creds = {
    "name": os.getenv("POSTGRES_DB"),
    "host": os.getenv("POSTGRES_HOST"),
    "port": os.getenv("POSTGRES_PORT"),
    "user": os.getenv("POSTGRES_USER"),
    "pwd": os.getenv("POSTGRES_PASSWORD"),
}

SQL_DATABASE_URL = f"postgresql+psycopg2://{db_creds['user']}:{db_creds['pwd']}@{db_creds['host']}:{db_creds['port']}/{db_creds['name']}"
engine = create_engine(SQL_DATABASE_URL, echo=True)
Base = declarative_base()


def conn():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
