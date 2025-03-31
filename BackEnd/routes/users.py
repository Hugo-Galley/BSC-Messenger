import logging
from models import Users
from fastapi import APIRouter
from config import db
import uuid
from cryptography.hazmat.primitives import hashes
import base64
from Class.api_class_body import AuthRequest, GetUserRequest, RegisterUser, GetAllOfUser
import os


router = APIRouter()

@router.post("/users/")
async def get_users(get_user : GetUserRequest):
    logging.debug(f"L'id récuperé est {get_user.username}")
    userData = db.query(Users).filter(Users.username == get_user.username).first()
    if userData:
        return {"id" : userData.id_user, "username": userData.username, "password" : userData.password, "publicKey" : userData.public_key, "salt" : userData.salt, "icon" : userData.icon}
    else:
        logging.error("L'utilisateur n'existe pas")
        return {"message" : "L'utilisateur demande n'existe pas"}

@router.post("/users/auth/")
async def auth_user(auth_data : AuthRequest):
    userData = db.query(Users).filter(Users.username == auth_data.username).first()
    if userData:
        auth_data.password += userData.salt
        digest = hashes.Hash(hashes.SHA256())
        digest.update(auth_data.password.encode())
        password = base64.b64encode(digest.finalize()).decode('utf-8')
        if password == userData.password:
            return {"authorize" : "true"}
        else:
            return {"authorize" : "false"}
    else:
        return {"message" : "L'utilisateur n'existe pas", "authorize": "false"}

@router.post("/users/register")
async def post_user(auth_data : RegisterUser):
    logging.info(auth_data)
    try:
        ifExistsUserData = db.query(Users).filter(Users.username == auth_data.username).first()
        if ifExistsUserData:
            return {"Message" : "Un utilisateur existe déja avec se nom d'utilisateur", "exists" : "true"}
        salt = base64.b64encode(os.urandom(16)).decode('utf-8')
        password = auth_data.password + salt
        digest = hashes.Hash(hashes.SHA256())
        digest.update(password.encode())
        password = base64.b64encode(digest.finalize()).decode('utf-8')
        newUser = Users(id_user=str(uuid.uuid4()),
                               username=auth_data.username,
                               password=password,
                               public_key=auth_data.publicKey,
                               salt=salt,
                               icon=auth_data.icon)
        db.add(newUser)
        db.commit()
        return {"Message" : f"User {auth_data.username} crée avec succées", "exists" : "false"}
    except Exception as e:
        logging.error(f"Erreur : {e}")
        return {"Message" : "Erreur lor de la création du User", "exists" : "false"}

@router.post("/users/all")
async def get_all_user(get_user : GetAllOfUser):
    usersData = (db.query(Users)
                 .with_entities(Users.id_user, Users.username, Users.icon)
                 .filter(Users.id_user != get_user.myId)
                 .all())
    return [{"id_user" : user[0], "username" : user[1], "icon" : user[2]} for user in usersData]
