import base64
from cryptography.hazmat.primitives import hashes
import os


class User:

    def __init__(self,username, password):
        self.username = username
        self.password = password
        self.publicKey = None
        self.privateKey = None
        self.salt = base64.b64encode(os.urandom(16)).decode('utf-8')
        self.id = None

    def HashAndSaltPassword(self):
        self.password += self.salt
        digest = hashes.Hash(hashes.SHA256())
        digest.update(self.password.encode())
        self.password = base64.b64encode(digest.finalize()).decode('utf-8')
