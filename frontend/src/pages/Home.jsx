import React, { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../api/productService";

// Importación de componentes
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

/**
 * Home Page - Orchestrator
 * 
 * Este componente centraliza el estado y la lógica CRUD para asegurar
 * que los datos fluyan correctamente entre el formulario y la tabla.
 */
const Home = () => {
  // ==============================
  // ESTADO GLOBAL DE LA PÁGINA
  // ==============================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  
  // Estado para controlar qué producto estamos editando
  const [editingProduct, setEditingProduct] = useState(null);

  // ==============================
  // LÓGICA DE DATOS (API)
  // ==============================

  // Cargar productos desde el backend
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudo conectar con el servidor 📡");
    } finally {
      setLoading(false);
    }
  }, []);

  // Efecto inicial de carga
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ==============================
  // MANEJADORES DE EVENTOS (CRUD)
  // ==============================

  /**
   * Procesa tanto la creación como la actualización
   * @param {Object} productData - Datos provenientes del formulario
   */
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        showFeedback("Producto actualizado correctamente ✨");
      } else {
        await createProduct(productData);
        showFeedback("Producto registrado con éxito 🐾");
      }
      
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Error al procesar la solicitud ⚠️");
    }
  };

  /**
   * Elimina un producto tras confirmar
   */
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      showFeedback("Producto eliminado 🗑️");
      await loadProducts();
    } catch (err) {
      setError("No se pudo eliminar el producto");
    }
  };

  /**
   * Prepara el formulario para edición
   */
  const handleEditRequest = (product) => {
    setEditingProduct(product);
    // UX: Scroll suave hacia arriba para que el usuario vea el formulario cargado
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper para mensajes temporales de éxito
  const showFeedback = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // ==============================
  // RENDERIZADO (UI)
  // ==============================

  return (
    <div className="container">
      {/* HEADER PROFESIONAL */}
      <header style={{ marginBottom: 'var(--space-lg)' }}>
        
      </header>

      {/* FEEDBACK VISUAL DE ÉXITO */}
      {message && <div className="success-message">{message}</div>}

      {/* GRID LAYOUT: Organiza Form y Tabla */}
      <div className="layout">
        
        {/* LADO IZQUIERDO: FORMULARIO */}
        <aside>
          <ProductForm 
            onCreate={handleSaveProduct} 
            initialData={editingProduct}
            onCancel={() => setEditingProduct(null)} 
          />
        </aside>

        {/* LADO DERECHO: TABLA */}
        <main>
          <ProductTable 
            products={products}
            loading={loading}
            error={error}
            onDelete={handleDeleteProduct}
            onEdit={handleEditRequest}
          />
        </main>

      </div>
    </div>
  );
};

export default Home;