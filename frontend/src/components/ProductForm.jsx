import { useState } from "react";

// Product form component
// Componente de formulario de productos
const ProductForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Simple validation
  // Validaciones básicas
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Required";
    if (!form.category) newErrors.category = "Required";
    if (!form.price || form.price <= 0)
      newErrors.price = "Must be greater than 0";

    // 🔥 IMPORTANTE: Validación de stock
    if (form.stock === "") {
      newErrors.stock = "Stock is required";
    } else if (form.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onCreate({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    });

    // Reset form
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Registrar Producto 🐾</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className={errors.name ? "error" : ""}
      />
      {errors.name && <span className="error-text">{errors.name}</span>}

      <input
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        className={errors.category ? "error" : ""}
      />
      {errors.category && (
        <span className="error-text">{errors.category}</span>
      )}

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className={errors.price ? "error" : ""}
      />
      {errors.price && <span className="error-text">{errors.price}</span>}

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className={errors.stock ? "error" : ""}
      />

      {/* 🔥 Validación visual clave */}
      {errors.stock && <span className="error-text">{errors.stock}</span>}

      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default ProductForm;