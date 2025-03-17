from Function.GetData import LoginUser
from Function.InsertData import CreateUser
from config import setupLog, db


if __name__ == "__main__":
    setupLog()
    try:
        # user = User("HugoNouveau","Test")
        # user.CreateKeyPair();
        CreateUser(db,"Axeltest","Test")
        # user.CreateKeyPair()
        #LoginUser(db,"HugoNouveau","Test")
    finally:
        db.close()

