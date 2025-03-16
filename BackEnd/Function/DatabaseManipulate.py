import logging
from cryptography.hazmat.primitives import hashes
import base64
import mysql.connector
import config
from Class.User import User
import uuid


conn = mysql.connector.connect(**config.configBdd)
cursor = conn.cursor()

def CreateUser(username, password):
    user = User(username,password)
    user.CreateKeyPair()
    user.HashAndSaltPassword()
    (publicKey,PrivateKey) = user.GetkeyPairInTextFormat()
    cursor.execute("INSERT INTO Users (id_user,username, password, public_key,salt) VALUES (%s, %s, %s, %s,%s)",
                    (str(uuid.uuid4()),user.username, user.password, publicKey,user.salt))
    conn.commit()
    logging.info(f"User {user.username} crée avec succées")
    return user
def LoginUser(username,password):
    digest = hashes.Hash(hashes.SHA256())
    digest.update(password.encode())
    cursor.execute("SELECT * FROM Users WHERE username = %s",(username,))
    userData = cursor.fetchone()
    if userData:
       password += userData[4]
       digest = hashes.Hash(hashes.SHA256())
       digest.update(password.encode())
       password = base64.b64encode(digest.finalize()).decode('utf-8')
       if password == userData[2]:
           logging.info("c'est carré")
       else:
           logging.critical("C'est mort")
    else:
        logging.error("C'est pas bon")
