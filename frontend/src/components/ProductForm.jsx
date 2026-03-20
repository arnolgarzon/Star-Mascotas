import { useState, useEffect } from "react";
import { PRODUCT_CATEGORIES } from "../constants/categories";

/**
 * ProductForm Component - Registro y Edición
 * 
 * @param {Function} onCreate - Manejador para guardar (Crear/Actualizar)
 * @param {Object} initialData - Datos del producto a editar (si existe)
 * @param {Function} onCancel - Función para limpiar el modo edición
 */
const ProductForm = ({ onCreate, initialData, onCancel }) => {
  
  // ==============================
  // ESTADO INICIAL Y FORMULARIO
  // ==============================
  const emptyForm = {
    name: "",
    category: "",
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Determina si estamos en modo edición basado en si recibimos datos
  const isEditing = !!initialData;

  // 🔥 EFECTO CRUCIAL: Sincroniza el formulario con el producto a editar
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
      });
      setErrors({}); // Limpia errores previos al cargar datos nuevos
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  // ==============================
  // VALIDACIÓN DE CAMPOS
  // ==============================
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "El nombre es obligatorio";
      else if (value.length < 3) error = "Mínimo 3 caracteres";
    }
    if (name === "category" && !value) error = "Selecciona una categoría";
    
    if (name === "price") {
      const num = Number(value);
      if (value === "") error = "El precio es requerido";
      else if (num <= 0) error = "Debe ser mayor a 0";
    }

    if (name === "stock") {
      if (value === "") error = "El stock es requerido";
      else if (Number(value) < 0) error = "No puede ser negativo";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // ==============================
  // MANEJADORES (HANDLERS)
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, form[name]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const validationErrors = {};
    Object.keys(form).forEach(key => {
      const err = validateField(key, form[key]);
      if (err) validationErrors[key] = err;
    });

    if (Object.keys(validationErrors).length > 0) {
      setTouched({ name: true, category: true, price: true, stock: true });
      return;
    }

    try {
      setLoading(true);
      
      // Limpieza de datos (Data Sanitization)
      const cleanData = {
        ...form,
        name: form.name.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
      };

      await onCreate(cleanData);
      
      // Resetear tras éxito si no estamos editando
      if (!isEditing) {
        setForm(emptyForm);
        setTouched({});
      }
    } catch (error) {
      console.error("Error en el formulario:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ayudante visual para clases de CSS
  const getInputClass = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "error" : "valid";
  };

  // ==============================
  // RENDERIZADO (UI)
  // ==============================
  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>{isEditing ? "Editar Producto 📝" : "Registrar Producto 🐾"}</h2>

      <div className="form-group">
        <label>Nombre del Producto</label>
        <input
          name="name"
          placeholder="Ej: Arena para gato"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("name")}
        />
        {touched.name && errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("category")}
        >
          <option value="">Selecciona una opción</option>
          {PRODUCT_CATEGORIES.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        {touched.category && errors.category && <span className="error-text">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Precio ($)</label>
        <input
          type="number"
          name="price"
          placeholder="0.00"
          value={form.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("price")}
        />
        {touched.price && errors.price && <span className="error-text">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>Stock Inicial</label>
        <input
          type="number"
          name="stock"
          placeholder="0"
          value={form.stock}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getInputClass("stock")}
        />
        {touched.stock && errors.stock && <span className="error-text">{errors.stock}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : isEditing ? "Actualizar Cambios" : "Guardar Producto"}
        </button>

        {isEditing && (
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onCancel}
            style={{ background: '#eee', color: '#333' }}
          >
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;