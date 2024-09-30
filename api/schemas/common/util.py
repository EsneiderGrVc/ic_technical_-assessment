from pydantic import BaseModel


class TokenResponse(BaseModel):
    access_tokenn: str
    token_type: str
