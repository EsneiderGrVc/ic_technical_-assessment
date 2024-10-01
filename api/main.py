import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.connection import conn
from routes.calc import calc_router
from routes.audit_log import audit_log
from routes.auth import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth, prefix="/auth")
app.include_router(calc_router, prefix="/calc")
app.include_router(audit_log, prefix="/audit_log")


@app.on_event("startup")
async def init_db():
    conn()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
