/**
 * @name exportToCSV
 * @description Convierte un arreglo de objetos a un archivo CSV y lo descarga.
 *
 * @param {Array<Object>} data - Arreglo de objetos a exportar.
 * @param {string} filename - Nombre del archivo CSV de salida.
 */
export const exportToCSV = (data, filename = "productos.csv") => {
  // 1. Validar que haya datos para exportar.
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar.");
    return;
  }

  // 2. Extraer los encabezados de la primera fila de datos.
  const headers = Object.keys(data[0]);

  // 3. Construir las filas del CSV.
  const csvRows = [];
  csvRows.push(headers.join(",")); // Fila de encabezados

  // 4. Mapear cada objeto a una fila de valores CSV.
  data.forEach((row) => {
    const values = headers.map((header) => {
      // Escapar comillas dobles para evitar errores en el formato CSV.
      const escaped = String(row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  });

  // 5. Unir todas las filas en un solo string.
  const csvString = csvRows.join("\n");

  // 6. Crear un Blob (objeto binario) para el contenido del archivo.
  const blob = new Blob([csvString], { type: "text/csv" });

  // 7. Simular un clic en un enlace para descargar el archivo.
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click(); // Iniciar descarga

  // 8. Limpiar el enlace y el objeto URL.
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};