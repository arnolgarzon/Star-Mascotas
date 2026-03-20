from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.api.routes import product

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory API")

# ✅ CORS CONFIG (CLAVE)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product.router)