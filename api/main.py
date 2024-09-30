import uvicorn
from fastapi import FastAPI

from config.connection import conn
from routes.calc import calc_router
from routes.audit_log import audit_log

app = FastAPI()

app.include_router(calc_router, prefix="/calc")
app.include_router(audit_log, prefix="/audit_log")


@app.on_event("startup")
async def init_db():
    conn()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
