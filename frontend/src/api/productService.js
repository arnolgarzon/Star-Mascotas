const API_URL = "http://localhost:8000/products";

/**
 * Fetch all products
 * Obtener todos los productos
 */
export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    return await response.json();
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return [];
  }
};

/**
 * Create a new product
 * Crear un nuevo producto
 */
export const createProduct = async (product) => {
  try {
    const response = await fetch(API_URL + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error creating product");
    }

    return await response.json();
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return null;
  }
};