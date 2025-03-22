from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.users import router
from api.routes.conversation import router as conVrouter

app = FastAPI()
app.include_router(router)
app.include_router(conVrouter)

authorize_origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=authorize_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/")
async def root():
    return {"message": "Bienvenue sur BSC Messenger API"}

