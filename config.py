import json
import logging
import colorlog

def load_config():
    with open("variables.json") as f:
        return json.load(f)

data =load_config()

def setupLog():

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

configBdd = {
    "host": data["Bdd"]["Host"],
    "user": data["Bdd"]["User"],
    "password": data["Bdd"]["Password"],
    "database": data["Bdd"]["DataBase"],
    "port": data["Bdd"]["Port"]
}