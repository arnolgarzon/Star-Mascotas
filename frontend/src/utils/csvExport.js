// Convert array of objects to CSV and trigger download
// Convierte un arreglo de objetos a CSV y dispara la descarga

export const exportToCSV = (data, filename = "products.csv") => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Extract headers (keys of the object)
  // Extraer encabezados (llaves del objeto)
  const headers = Object.keys(data[0]);

  // Convert data to CSV rows
  // Convertir datos a filas CSV
  const csvRows = [];

  // Header row
  csvRows.push(headers.join(","));

  // Data rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      const escaped = String(row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  });

  // Join all rows
  const csvString = csvRows.join("\n");

  // Create Blob
  const blob = new Blob([csvString], { type: "text/csv" });

  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};