from config import db
from fastapi import APIRouter
from Class.api_class_body import DecryptMessage

router = APIRouter()

@router.get("/message/decrypt")
async def get_decrypt_message(decrypt_message : DecryptMessage):
    pass
