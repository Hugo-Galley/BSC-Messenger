import logging
from models import Users
from Class.class_object import User
import uuid
from sqlalchemy.orm import Session

def CreateUser(db: Session, username : str, password : str):


    db.add(newUser)
    db.commit()
    logging.info(f"User {user.username} crée avec succées")
    return user