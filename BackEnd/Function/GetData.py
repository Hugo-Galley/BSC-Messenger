import logging
from cryptography.hazmat.primitives import hashes
import base64
import models
from sqlalchemy.orm import Session
from models import Users


def LoginUser(db: Session, username : str ,password : str):
    userData  = db.query(models.Users).filter(Users.username == username).first()
    if userData:
       password += userData.salt
       digest = hashes.Hash(hashes.SHA256())
       digest.update(password.encode())
       password = base64.b64encode(digest.finalize()).decode('utf-8')
       if password == userData.password:
           logging.info("Connexion réussi")
       else:
           logging.error("Connexion refusé, mot de passe incorect")
    else:
        logging.critical("Aucun user trouvé")
