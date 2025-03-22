from Function.GetData import LoginUser
from Function.InsertData import CreateUser
from config import setupLog, db
from Class.class_object import User


if __name__ == "__main__":
    setupLog()
    try:
        # user = User("SuperTest","Test")
        CreateUser(db, "MarioCotillard","Test")
        # user.CreateKeyPair()
        #LoginUser(db,"HugoNouveau","Test")
    finally:
        db.close()

