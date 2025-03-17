import json
import logging
import colorlog
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def load_config():
    with open("variables.json") as f:
        return json.load(f)

def configBdd():
    engine = create_engine(f"mysql+pymysql://{data['Bdd']['User']}:{data['Bdd']['Password']}@{data['Bdd']['Host']}:{data['Bdd']['Port']}/{data['Bdd']['DataBase']}")
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    return db

data =load_config()
db = configBdd()

def setupLog():
    os.makedirs(os.path.join(os.getcwd(), "log"), exist_ok=True)
    loggger = logging.getLogger()
    loggger.setLevel(logging.DEBUG)

    console_handler = colorlog.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(
        colorlog.ColoredFormatter(
            "%(log_color)s%(asctime)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
            log_colors={
                'DEBUG': 'cyan',
                'INFO': 'green',
                'WARNING': 'yellow',
                'ERROR': 'red',
                'CRITICAL': 'bold_red',
            }
        )
    )

    file_handler = logging.FileHandler(data["Log"]["FileDestination"], mode="a")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    ))

    loggger.addHandler(console_handler)
    loggger.addHandler(file_handler)
