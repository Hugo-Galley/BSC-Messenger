import logging
from models import Users
from Class.class_object import User
from fastapi import APIRouter
from config import db
import uuid
from cryptography.hazmat.primitives import hashes
import base64
from Class.api_class_body import AuthRequest, GetUserRequest


router = APIRouter()

@router.get("/users/")
async def get_users(get_user : GetUserRequest):
    logging.debug(f"L'id récuperé est {get_user.id}")
    userData = db.query(Users).filter(Users.id_user == get_user.id).first()
    if userData:
        return {"id" : userData.id_user, "username": userData.username, "password" : userData.password, "publicKey" : userData.public_key, "salt" : userData.salt}
    else:
        logging.error("L'utilisateur n'existe pas")
        return {"message" : "L'utilisateur demande n'existe pas"}

@router.get("/users/auth/")
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
async def post_user(auth_data : AuthRequest):
    try:
        ifExistsUserData = db.query(Users).filter(Users.username == auth_data.username).first()
        if ifExistsUserData:
            return {"Message" : "Un utilisateur existe déja avec se nom d'utilisateur", "exists" : "true"}
        user = User(auth_data.username,auth_data.password)
        user.CreateKeyPair()
        user.HashAndSaltPassword()
        (publicKey,privateKey) = user.GetkeyPairInTextFormat()
        newUser = Users(id_user=str(uuid.uuid4()),
                               username=user.username,
                               password=user.password,
                               public_key=publicKey,
                               salt=user.salt)
        db.add(newUser)
        db.commit()
        return {"Message" : f"User {auth_data.username} crée avec succées", "exists" : "false"}
    except Exception as e:
        logging.error(f"Erreur : {e}")
        return {"Message" : "Erreur lor de la création du User", "exists" : "false"}

@router.get("/users/all")
async def get_all_user():
    usersData = db.query(Users).with_entities(Users.id_user, Users.username, Users.icon).all()
    return [{"id_user" : user[0], "username" : user[1], "icon" : user[2]} for user in usersData]
