from fastapi import FastAPI
from api.routes.users import router

app = FastAPI()
app.include_router(router)
@app.get("/")
async def root():
    return {"message": "Bienvenue sur BSC Messenger API"}
