from fastapi import FastAPI
from app.database import Base, engine
from app.api.routes import product

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory API")

app.include_router(product.router)