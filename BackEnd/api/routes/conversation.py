import base64
import logging
import uuid
from config import db
from fastapi import APIRouter
from Class.api_class_body import CreateNewConversation, AddMessageToConversation, GetAllConversationForUser
from models import Conversation, Messages, Users
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_public_key
from sqlalchemy import desc


router = APIRouter()

@router.post("/conversation/new")
async def create_new_conversation(create_conversation : CreateNewConversation):
    try:
        newConversation = Conversation(
            id_conversation = str(uuid.uuid4()),
            id_user1 = create_conversation.id_user1,
            id_user2 = create_conversation.id_user2
        )
        db.add(newConversation)
        db.commit()
        logging.info(f"La conversation à bien été créer")
    except Exception as e:
        logging.error(f"Erreur lor de la création de la conversation : {e}")

@router.post("/conversation/addMessage")
async def add_message_to_conversation(add_to_conv : AddMessageToConversation):
    try:
        receiver = db.query(Users).filter(Users.id_user == add_to_conv.id_receiver).first()
        public_key = load_pem_public_key(receiver.public_key.encode())
        encryptedContent = public_key.encrypt(
            add_to_conv.content.encode(),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        final_content = base64.b64encode(encryptedContent).decode('utf-8')
        newMessage = Messages(
            id_message = str(uuid.uuid4()),
            id_receiver = add_to_conv.id_receiver,
            content = final_content,
            sendAt = add_to_conv.sendAt,
            id_conversation = add_to_conv.id_conversation
        )
        db.add(newMessage)
        db.commit()
    except Exception as e :
        logging.error(f" Erreur lors de l'ajout d'un message à une conversation : {e}")

@router.get("/conversation/allOfUser")
async def get_all_conversation_for_user(id_user : str):
    conversationsData = ((db.query(Conversation)
                         .join(Messages, Messages.id_conversation == Conversation.id_conversation))
                         .join(Users, Users.id_user == Conversation.id_user1)
                         .order_by(desc(Messages.sendAt))
                         .filter(Users.id_user == id_user)
                         .with_entities(Users.username, Conversation.id_conversation, Users.icon, Messages.sendAt, Messages.content)
                         .all())
    if conversationsData:
        logging.info(f"Récupération effectué avec succées pour le User {id_user}")
        return [{"conversation_id" : conversation.id_conversation, "icon" : conversation.icon, "title" : conversation.username, "lastMessageDate" : conversation.sendAt, "body" : conversation.content} for conversation in conversationsData]
    else:
        logging.error(f"Erreur lors de la récuperération des conversation pour le user {id_user} ")
        return []
@router.get("/conversation/allMessage")
async def get_all_message(id_conversation : str):
    messagesData = (db.query(Messages)
                    .filter(Messages.id_conversation == id_conversation)
                    .all())
    if messagesData:
        logging.info(f"Messages de la conversation {id_conversation} récupoeré avec suucées")
        return [{"content" : message.content, "id_receiver" : message.id_receiver, "sendAt" : message.sendAt} for message in messagesData]
    else:
        logging.error(f"Erreur lors de la récupération des messages de la conversation {id_conversation}")



