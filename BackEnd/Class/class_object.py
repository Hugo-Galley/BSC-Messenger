import logging
import uuid
import models
import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization
import os
from config import db

class User:

    def __init__(self,username, password):
        self.username = username
        self.password = password
        self.publicKey = None
        self.privateKey = None
        self.salt = base64.b64encode(os.urandom(16)).decode('utf-8')
        self.id = None

    def CreateKeyPair(self):
        self.privateKey = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        self.publicKey = self.privateKey.public_key()
        os.makedirs(os.path.join(os.getcwd(), "clients", self.username), exist_ok=True)
        (publicKey,privateKey) = self.GetkeyPairInTextFormat()
        with open(os.path.join("clients", self.username, "privateKey.key"), mode="w+") as f:
            f.write(privateKey)

    def GetkeyPairInTextFormat(self):
        privateKey_pem = self.privateKey.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()

            ).decode('utf-8')
        publicKey_pem = self.publicKey.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
        return (publicKey_pem,privateKey_pem)

    def HashAndSaltPassword(self):
        self.password += self.salt
        digest = hashes.Hash(hashes.SHA256())
        digest.update(self.password.encode())
        self.password = base64.b64encode(digest.finalize()).decode('utf-8')

    def GetIdFromDatabase(self):
        """
        Pouvoir recuperer l'id de l'utilisateurs depuis la bdd
        """
        pass
    def SendMessage(self, idConversation : int, idReceiver : int, content : str):
        receiver = db.query(models.Users).filter(models.Users.id_user == idReceiver).first()
        conversation = db.query(models.Conversation).filter(models.Conversation.id_conversation == idConversation).first()
        if receiver and conversation:
            encryptedContent = receiver.publicKey.encrypt(
                content,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )
            newMessage = models.Messages(
                id_message=str(uuid.uuid4()),
                content=encryptedContent,
                id_receiver = receiver.id
            )
            db.add(newMessage)
            db.commit()
        else:
            logging.error("Aucun utilisateurs n'a été trouvé")


class Message:

    def __init__(self, conversation, sender,content):
        self.conversation = conversation
        self.sender = sender
        self.content = content

class Conversation:

    def __init__(self,user1 : User ,user2 : User):
        self.user1 = user1
        self.user2 = user2
        self.id = str(uuid.uuid4())

    def CreateConversation(self):
        """
        Il faut changer cette methode afin de retourner l'id du user et pas son username
        """
        newConversation = models.Conversation(id_conversation=self.id,
                                              id_user_1=self.user1.username,
                                              id_user_2=self.user2.username)
        db.add(newConversation)
        db.commit()

        logging.info(f"Conversation entre {self.user1.username} et {self.user2.username} est crée avec success")

    def AddMessage(self, message : Message, user : User):
        pass



