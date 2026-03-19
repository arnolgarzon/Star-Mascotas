from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.product import Product, ProductCreate
from app.crud import product as crud

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=Product)
def create(product: ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@router.get("/", response_model=list[Product])
def read_all(db: Session = Depends(get_db)):
    return crud.get_products(db)

@router.get("/{product_id}", response_model=Product)
def read_one(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Not found")
    return product

@router.put("/{product_id}", response_model=Product)
def update(product_id: int, data: ProductCreate, db: Session = Depends(get_db)):
    product = crud.update_product(db, product_id, data)
    if not product:
        raise HTTPException(status_code=404, detail="Not found")
    return product

@router.delete("/{product_id}")
def delete(product_id: int, db: Session = Depends(get_db)):
    product = crud.delete_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Not found")
    return {"message": "Deleted"}