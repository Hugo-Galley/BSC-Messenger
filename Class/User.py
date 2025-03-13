import base64

from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
class User:

    def __init__(self,username, password):
        self.username = username
        self.password = password
        self.publicKey = ""
        self.privateKey = ""

    def CreateKeyPair(self):
        self.privateKey = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        self.publicKey = self.privateKey.public_key()

    def GetkeyPairInTextFormat(self):
        publicKeyTextFormat = self.privateKey.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()

            ).decode('utf-8')
        privateKeyTextFormat = self.publicKey.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
        return (publicKeyTextFormat,privateKeyTextFormat)

    def HashAndSaltPassword(self):
        self.password += "47798d12ae31ce5a6d9c9dddec7bc9f2a27fffa424b7f2a154fa0e26690972de"
        digest = hashes.Hash(hashes.SHA256())
        digest.update(self.password.encode())
        self.password = base64.b64encode(digest.finalize()).decode('utf-8')

