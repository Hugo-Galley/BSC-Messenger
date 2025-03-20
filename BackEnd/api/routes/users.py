import logging
from models import Users
from Class.class_object import User
from fastapi import APIRouter
from config import db
import uuid

router = APIRouter()

@router.get("/users/")
async def get_users(user_id):
    logging.debug(f"L'id récuperé est {user_id}")
    userData = db.query(Users).filter(Users.id_user == user_id).first()
    if userData:
        return {"id" : userData.id_user, "username": userData.username, "password" : userData.password, "publicKey" : userData.public_key, "salt" : userData.salt}
    else:
        logging.error("L'utilisateur n'existe pas")
        return {"message" : "L'utilisateur demande n'existe pas"}

@router.get("/users/auth/")
async def auth_user(username : str, password : str):
    userData = db.query(Users).filter(Users.username == username).first()
    if userData:
        if password == userData.password:
            return {"authorize" : "true"}
        else:
            return {"authorize" : "false"}

@router.get("/users/getSalt")
async def get_salt(username :str):
    userData = db.query(Users).filter(Users.username == username).first()
    if userData:
        return {"find" : "true", "salt" : userData.salt}
    else:
        return {"find" : "false"}

@router.post("/users/register")
async def post_user(username : str, password : str, salt : str):
    user = User(username,password)
    user.CreateKeyPair()
    (publicKey,privateKey) = user.GetkeyPairInTextFormat()
    newUser = Users(id_user=str(uuid.uuid4()),
                           username=user.username,
                           password=user.password,
                           public_key=publicKey,
                           salt=salt)
    db.add(newUser)
    db.commit()

