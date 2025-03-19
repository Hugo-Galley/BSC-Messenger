import logging
from models import Users
from fastapi import APIRouter
from config import db

router = APIRouter()

@router.get("/users/{user_id}")
async def get_users(user_id):
    logging.warning(f"L'id récuperé est {user_id}")
    userData = db.query(Users).filter(Users.id_user == user_id).first()
    if userData:
        return {"id" : userData.id_user, "username": userData.username, "password" : userData.password, "publicKey" : userData.public_key, "salt" : userData.salt}
    else:
        logging.error("L'utilisateur n'existe pas")
        return {"message" : "L'utilisateur demande n'existe pas"}
