import datetime

from pydantic import BaseModel

class AuthRequest(BaseModel):
    username : str
    password : str
class GetUserRequest(BaseModel):
    id : str
class CreateNewConversation(BaseModel):
    id_user1 : str
    id_user2 : str
class AddMessageToConversation(BaseModel):
    id_receiver : str
    content : str
    sendAt : str
    id_conversation : str