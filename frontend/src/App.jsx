import { useState, useEffect } from "react";
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(true);

  // Simula una pantalla de carga al iniciar la aplicación.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
        <p className="loader-text">INICIANDO SISTEMA...</p>
        <p className="loader-text">Design by Arnol Garzon</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header Principal */}
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', margin: 0 }}>
          Star Mascotas 🐾
        </h1>
      </header>

      {/* Contenido Dinámico */}
      <Home />

      {/* Derechos de Autor */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Star Mascotas. Todos los derechos reservados.</p>
        <p>
          Diseñado y Desarrollado por <span className="footer-name">ARNOL GARZON</span>
        </p>
      </footer>
    </div>
  );
}

export default App;