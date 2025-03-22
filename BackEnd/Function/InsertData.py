import logging
from models import Users
from Class.class_object import User
import uuid
from sqlalchemy.orm import Session

def CreateUser(db: Session, username : str, password : str):
    user = User(username,password)
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
    logging.info(f"User {user.username} crée avec succées")
    return user