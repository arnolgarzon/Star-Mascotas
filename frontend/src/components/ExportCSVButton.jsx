import { exportToCSV } from "../utils/csvExport";

/**
 * @name ExportCSVButton
 * @description Botón que exporta la data de productos a un archivo CSV.
 */
const ExportCSVButton = ({ data }) => {
  // Manejador para la exportación de datos
  const handleExport = () => {
    // Mapeo de los datos para que coincidan con el formato esperado por la función de exportación
    const petProducts = data.map((p) => ({
      Nombre: p.name,
      Categoría: p.category,
      Precio: p.price,
      Stock: p.stock,
    }));

    exportToCSV(petProducts, "productos_mascotas.csv");
  };

  return (
    <button onClick={handleExport} style={{ marginBottom: "15px" }}>
      Descargar CSV
    </button>
  );
};

export default ExportCSVButton;