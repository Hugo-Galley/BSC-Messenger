import json
import logging
import colorlog

def load_config():
    with open("variables.json") as f:
        return json.load(f)

data =load_config()

def setupLog():
    handler = colorlog.StreamHandler()
    handler.setFormatter(colorlog.ColoredFormatter(
        "%(log_color)s%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        log_colors={
            'DEBUG': 'cyan',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'bold_red',
        }
    ))

    logging.basicConfig(
        level=logging.DEBUG,
        handlers=[
            handler,
            logging.FileHandler(data["Log"]["FileDestination"], mode="a")
        ]
    )
configBdd = {
    "host": data["Bdd"]["Host"],
    "user": data["Bdd"]["User"],
    "password": data["Bdd"]["Password"],
    "database": data["Bdd"]["DataBase"],
    "port": data["Bdd"]["Port"]
}