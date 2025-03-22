from pydantic import BaseModel

class AuthRequest(BaseModel):
    username : str
    password : str
class GetUserRequest(BaseModel):
    id : str