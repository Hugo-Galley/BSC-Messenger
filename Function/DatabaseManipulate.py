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
    cursor.execute("INSERT INTO Users (id_user,username, password, public_key) VALUES (%s, %s, %s, %s)",
                    (str(uuid.uuid4()),user.username, user.password, publicKey))
    conn.commit()
    logging.info(f"User {user.username} crée avec succées")
    return user
def LoginUser(username,password):
    password += "47798d12ae31ce5a6d9c9dddec7bc9f2a27fffa424b7f2a154fa0e26690972de"
    digest = hashes.Hash(hashes.SHA256())
    digest.update(password.encode())
    password = base64.b64encode(digest.finalize()).decode('utf-8')
    cursor.execute("SELECT * FROM Users WHERE username = %s and password = %s",(username,password))
    if cursor.fetchone():
        logging.info("Ca fonctionne ")
    else:
        logging.error("C'est pas bon")
