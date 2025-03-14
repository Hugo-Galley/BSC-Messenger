import base64
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
import os


class User:

    def __init__(self,username, password):
        self.username = username
        self.password = password
        self.publicKey = ""
        self.privateKey = ""
        self.salt = base64.b64encode(os.urandom(16)).decode('utf-8')

    def CreateKeyPair(self):
        self.privateKey = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        self.publicKey = self.privateKey.public_key()
        os.makedirs(os.path.join(os.getcwd(), "clients", self.username), exist_ok=True)
        self.GetkeyPairInTextFormat()
        with open(os.path.join("clients", self.username, "privateKey.key"), mode="w+") as f:
            f.write(self.privateKey)



    def GetkeyPairInTextFormat(self):
        self.privateKey = self.privateKey.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()

            ).decode('utf-8')
        self.publicKey = self.publicKey.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
            )

        return (self.publicKey,self.privateKey)

    def HashAndSaltPassword(self):
        self.password += self.salt
        digest = hashes.Hash(hashes.SHA256())
        digest.update(self.password.encode())
        self.password = base64.b64encode(digest.finalize()).decode('utf-8')


