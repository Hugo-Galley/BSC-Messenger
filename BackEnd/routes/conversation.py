import asyncio
import base64
import datetime
import logging
import uuid
from config import db
from fastapi import APIRouter
from Class.api_class_body import CreateNewConversation, AddMessageToConversation, GetConversationInfo, GetMessageOfConversation
from models import Conversation, Messages, Users
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_public_key
from sqlalchemy import desc, or_, func
from sqlalchemy.orm import aliased


router = APIRouter()

@router.post("/conversation/new")
async def create_new_conversation(create_conversation : CreateNewConversation):
    try:
        newConversation = Conversation(
            id_conversation = str(uuid.uuid4()),
            id_user1 = create_conversation.id_user1,
            id_user2 = create_conversation.id_user2,
            CreateAt = datetime.datetime.now()
        )
        db.add(newConversation)
        db.commit()
        conversationId = (db.query(Conversation)
                          .order_by(desc(Conversation.CreateAt))
                          .first())
        logging.info(f"La conversation à bien été créer")
        return {"succes" : "true", "id_conversation" : conversationId.id_conversation}
    except Exception as e:
        logging.error(f"Erreur lor de la création de la conversation : {e}")
        return {"succes": "false"}

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
            sendAt = datetime.datetime.now(),
            id_conversation = add_to_conv.id_conversation
        )
        infoMessage = db.query(Messages).order_by(desc(Messages.sendAt)).first()
        db.add(newMessage)
        db.commit()
        return {"id_message" : infoMessage.id_message, "succes" : "true"}
    except Exception as e :
        logging.error(f" Erreur lors de l'ajout d'un message à une conversation : {e}")
        return {"succes" : "false"}


@router.get("/conversation/allOfUser")
async def get_all_conversation_for_user(id_user: str):
    user1_alias = aliased(Users, name="user1")
    user2_alias = aliased(Users, name="user2")

    conversationInfo = (
        db.query(
            user1_alias.username.label("user1_name"),
            user2_alias.username.label("user2_name"),
            user1_alias.icon.label("user1_icon"),
            user2_alias.icon.label("user2_icon"),
            user1_alias.id_user.label("id_user1"),
            user2_alias.id_user.label("id_user2"),
            Conversation.id_conversation
        )
        .join(user1_alias, user1_alias.id_user == Conversation.id_user1)
        .join(user2_alias, user2_alias.id_user == Conversation.id_user2)
        .filter(or_(user1_alias.id_user == id_user, user2_alias.id_user == id_user))
        .all()
    )

    if conversationInfo:
        return [
            {
                "name": f"{data.user1_name} et {data.user2_name}",
                "icon": data.user2_icon,
                "id_user1": data.id_user1,
                "id_user2": data.id_user2,
                "id_conversation" : data.id_conversation
            }
            for data in conversationInfo
        ]
    else:
        return {"error": "Conversation non trouvée"}



@router.post("/conversation/allMessage")
async def get_all_message(get_message : GetMessageOfConversation):
    if isinstance(get_message.lastMessageDate, str):
        get_message.lastMessageDate = datetime.datetime.strptime(get_message.lastMessageDate, "%Y-%m-%d %H:%M:%S")

    timeout = 30
    pollingInterval = 1
    startTime = datetime.datetime.utcnow()

    while (datetime.datetime.utcnow() - startTime).total_seconds() < timeout:
        messageList = (db.query(Messages)
         .filter(Messages.id_receiver == get_message.myId,
                 Messages.id_conversation == get_message.id_conversation,
                Messages.sendAt > get_message.lastMessageDate)
         .all())

        if messageList:
            return [
                {
                    "id_message" : message.id_message,
                    "id_conversation" : message.id_conversation,
                    "content" : message.content,
                    "sendAt" : message.sendAt,
                    "id_receiver" : message.id_receiver
                }
            for message in messageList]
        await asyncio.sleep(pollingInterval)
    return []

@router.post("/conversation/info")
async def get_conversation_info(get_conversation : GetConversationInfo):
    user1_alias = aliased(Users, name="user1")
    user2_alias = aliased(Users, name="user2")

    conversationInfo = (
        db.query(
            user1_alias.username.label("user1_name"),
            user2_alias.username.label("user2_name"),
            user1_alias.icon.label("user1_icon"),
            user2_alias.icon.label("user2_icon"),
            user1_alias.id_user.label("id_user1"),
            user2_alias.id_user.label("id_user2"),
            Conversation.id_conversation
        )
        .join(user1_alias, user1_alias.id_user == Conversation.id_user1)
        .join(user2_alias, user2_alias.id_user == Conversation.id_user2)
        .filter(Conversation.id_conversation == get_conversation.id_conversation)
        .first()
    )

    if conversationInfo:
        return {
                "name": f"{conversationInfo.user1_name} et {conversationInfo.user2_name}",
                "icon": conversationInfo.user2_icon,
                "id_user1": conversationInfo.id_user1,
                "id_user2": conversationInfo.id_user2,
                "id_conversation": conversationInfo.id_conversation
            }
    else:
        return {"error": "Conversation non trouvée"}
