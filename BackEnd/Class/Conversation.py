import logging
import uuid
from Message import Message
from User import User
import models
from config import db


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



