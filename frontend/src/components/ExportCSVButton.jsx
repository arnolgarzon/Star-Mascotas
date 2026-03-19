import { exportToCSV } from "../utils/csvExport";

// Button component to export products to CSV
// Botón para exportar productos a CSV
const ExportCSVButton = ({ data }) => {
  const handleExport = () => {
    // Example: pet products array
    // Ejemplo: productos de mascotas
    const petProducts = data.map((p) => ({
      Name: p.name,
      Category: p.category,
      Price: p.price,
      Stock: p.stock,
    }));

    exportToCSV(petProducts, "pet_products.csv");
  };

  return (
    <button onClick={handleExport} style={{ marginBottom: "15px" }}>
      Descargar CSV
    </button>
  );
};

export default ExportCSVButton;