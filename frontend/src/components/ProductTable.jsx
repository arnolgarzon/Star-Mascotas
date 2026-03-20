import React from "react";
import ExportCSVButton from "./ExportCSVButton";

/**
 * ProductTable Component (Refactored)
 * 
 * @param {Array} products - Lista de productos a mostrar
 * @param {boolean} loading - Estado de carga
 * @param {string} error - Mensaje de error si existe
 * @param {function} onDelete - Función para eliminar
 * @param {function} onEdit - Función para cargar datos en el formulario
 */
const ProductTable = ({ products, loading, error, onDelete, onEdit }) => {

  // ==============================
  // RENDER HELPERS (Lógica de dibujado)
  // ==============================

  // Helper que renderiza el contenido de la tabla según el estado (carga, error, vacío o datos).
  const renderContent = () => {
    // 1. Estado de Carga
    if (loading) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            <div className="loading-spinner">Cargando productos...</div>
          </td>
        </tr>
      );
    }

    // 2. Estado de Error
    if (error) {
      return (
        <tr>
          <td colSpan="5" style={{ color: "var(--color-error)", textAlign: "center", padding: "20px" }}>
            {error}
          </td>
        </tr>
      );
    }

    // 3. Estado Vacío
    if (products.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">No hay productos registrados 🐾</td>
        </tr>
      );
    }

    // 4. Renderizado de Filas
    return products.map((p) => (
      <tr key={p.id}>
        <td><strong>{p.name}</strong></td>
        <td>
          <span className="badge">{p.category}</span>
        </td>
        <td>${Number(p.price).toLocaleString('es-CO')}</td>
        <td>
          {/* Indicador visual de stock bajo */}
          <span style={{ color: p.stock < 5 ? 'var(--color-error)' : 'inherit', fontWeight: p.stock < 5 ? 'bold' : 'normal' }}>
            {p.stock} {p.stock < 5 && '⚠️'}
          </span>
        </td>
        <td>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => onEdit(p)}
            >
              Editar
            </button>
            <button 
              className="btn-error" 
              style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--color-error)', color: 'white' }}
              onClick={() => onDelete(p.id)}
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  // ==============================
  // ESTRUCTURA PRINCIPAL DEL COMPONENTE
  // ==============================

  return (
    <div className="table-section">
      <div className="table-header">
        <h2>Inventario Disponible</h2>
        <ExportCSVButton data={products} />
      </div>

      {/* Contenedor con scroll horizontal para móviles */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {renderContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;