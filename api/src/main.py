from fastapi import FastAPI

from .routers import ping

app = FastAPI()
app.include_router(ping.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}