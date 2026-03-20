/**
 * @file productService.js
 * @description Módulo para gestionar las llamadas a la API de productos.
 * Centraliza el fetch, manejo de errores y transformaciones de datos.
 */

// URL base del backend.
const API_URL = "http://localhost:8000/products";

/**
 * @name handleResponse
 * @description Maneja las respuestas HTTP de forma centralizada para evitar duplicación de código.
 *
 * @param {Response} response - Objeto de respuesta de la API.
 * @returns {Promise<any>} - JSON de la respuesta si es exitosa.
 * @throws {Error} - Lanza un error si la respuesta no es 'ok'.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = "Error inesperado";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(`HTTP ${response.status}: ${errorMessage}`);
  }
  return response.json();
};

/**
 * @name getProducts
 * @description Obtiene todos los productos del backend.
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ ERROR AL OBTENER PRODUCTOS:", error);
    throw new Error(
      "No se pudieron obtener los productos. Verifica la conexión con el backend."
    );
  }
};

/**
 * @name createProduct
 * @description Crea un nuevo producto en el backend.
 *
 * @param {object} product - Datos del producto a crear.
 */
export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ ERROR AL CREAR PRODUCTO:", error);
    throw new Error(
      "No se pudo crear el producto. Verifica los datos o el estado del servidor."
    );
  }
};

/**
 * @name updateProduct
 * @description Actualiza un producto existente en el backend.
 *
 * @param {number|string} id - ID del producto a actualizar.
 * @param {object} product - Nuevos datos del producto.
 */
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("❌ ERROR AL ACTUALIZAR PRODUCTO:", error);
    throw new Error("No se pudo actualizar el producto. Verifica los datos.");
  }
};

/**
 * @name deleteProduct
 * @description Elimina un producto del backend.
 *
 * @param {number|string} id - ID del producto a eliminar.
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    // Para DELETE, a menudo no se devuelve un cuerpo JSON,
    // así que se maneja la respuesta de forma diferente.
    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }
    return true; // Éxito
  } catch (error) {
    console.error("❌ ERROR AL ELIMINAR PRODUCTO:", error);
    throw new Error("No se pudo eliminar el producto.");
  }
};