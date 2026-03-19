import { useEffect, useState, useCallback } from "react";
import { getProducts, createProduct } from "../api/productService";
import ExportCSVButton from "./ExportCSVButton";
import ProductForm from "./ProductForm";

/**
 * ProductTable Component
 *
 * Responsibilities:
 * - Fetch and display products
 * - Handle product creation
 * - Manage UI states (loading, empty, error)
 *
 * Responsabilidades:
 * - Obtener y mostrar productos
 * - Manejar creación de productos
 * - Gestionar estados de UI (carga, vacío, error)
 */
const ProductTable = () => {
  // ==============================
  // STATE MANAGEMENT
  // ==============================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // DATA FETCHING
  // ==============================

  /**
   * Load products from API
   * Cargar productos desde el backend
   */
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Error cargando productos");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load data on component mount
   * Ejecutar al montar el componente
   */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // ==============================
  // CREATE PRODUCT
  // ==============================

  /**
   * Handle product creation
   * Crear producto y refrescar lista
   */
  const handleCreate = async (product) => {
    try {
      await createProduct(product);

      // Refresh list after creation
      // Recargar lista después de crear
      await loadProducts();
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Error creando producto");
    }
  };

  // ==============================
  // RENDER HELPERS
  // ==============================

  /**
   * Render table rows
   * Renderizar filas de la tabla
   */
  const renderRows = () => {
    return products.map((p) => (
      <tr key={p.id}>
        <td>{p.name}</td>
        <td>{p.category}</td>
        <td>${Number(p.price).toFixed(2)}</td>
        <td>{p.stock}</td>
      </tr>
    ));
  };

  /**
   * Render table body based on state
   * Renderizar contenido según estado
   */
  const renderContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="4">Cargando productos...</td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="4" style={{ color: "red" }}>
            {error}
          </td>
        </tr>
      );
    }

    if (products.length === 0) {
      return (
        <tr>
          <td colSpan="4">No hay productos registrados 🐾</td>
        </tr>
      );
    }

    return renderRows();
  };

  // ==============================
  // COMPONENT UI
  // ==============================

  return (
    <div className="container">
      {/* Product Form */}
      <ProductForm onCreate={handleCreate} />

      {/* Header */}
      <div className="table-header">
        <h2>Inventario</h2>

        {/* CSV Export */}
        <ExportCSVButton data={products} />
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>{renderContent()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;