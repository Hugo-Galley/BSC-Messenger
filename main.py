from Class.User import User
from config import setupLog
import logging


if __name__ == "__main__":
    setupLog()
    hugo = User("Hugo","admin")
    hugo.CreateKeyPair()
    logging.info(hugo.GetkeyPairInTextFormat())
    logging.info(hugo.password)
    hugo.HashAndSaltPassword()
    logging.info(hugo.password)