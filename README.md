# 🐾 Star Mascotas - Sistema de Gestión de Inventario

Aplicación web moderna para la gestión de inventario en tiendas de mascotas.

Diseñada con enfoque en **simplicidad, velocidad y experiencia de usuario**, permite registrar, visualizar y administrar productos de forma intuitiva tanto en computador como en dispositivos móviles.

---

## 🎯 ¿Qué hace esta aplicación?

Permite gestionar un inventario básico de productos:

- 📝 Registrar productos
- 📦 Ver listado de productos
- ✏️ Editar productos
- 🗑️ Eliminar productos
- 📊 Exportar inventario a CSV

---

## 🖼️ Interfaz

La aplicación está diseñada como un pequeño panel administrativo:

- Formulario de registro
- Tabla de inventario
- Botones de acción (editar, eliminar, exportar)

Además, cuenta con:

- 🎨 Diseño responsivo (funciona en celular y PC)
- ⚡ Interacciones rápidas
- 🧠 Validaciones visuales en formularios

---

## 🚀 Tecnologías Utilizadas

### Frontend
- React.js
- Vite
- CSS3 (Variables globales - theme.css)

### Backend
- FastAPI (Python)
- SQLite (Base de datos ligera)

---

## 📁 Estructura del Proyecto
project/
│
├── backend/
│ ├── main.py
│ ├── models.py
│ ├── database.py
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── api/
│ │ ├── styles/
│ │ ├── App.jsx
│ │ └── main.jsx


---

# 🧭 🧑‍💻 GUÍA DE INSTALACIÓN (PASO A PASO)

> Si no tienes experiencia técnica, sigue esto literalmente 👇

---

## 🧱 1. Instalar Node.js

Node.js es necesario para ejecutar el frontend.

👉 Descárgalo aquí:  
https://nodejs.org/  
(Recomendado: versión LTS)

---

## 🐍 2. Instalar Python

Necesario para el backend.

👉 Descárgalo aquí:  
https://www.python.org/downloads/

---

## 📥 3. Descargar el proyecto

Puedes hacerlo de dos formas:

### Opción 1 (recomendada)
```bash
git clone https://github.com/arnolgarzon/Star-Mascotas

Opción 2

Descargar el ZIP desde GitHub y descomprimirlo.

⚙️ CONFIGURACIÓN DEL BACKEND
📂 4. Ir a la carpeta backend
cd backend
📦 5. Instalar dependencias
pip install fastapi uvicorn sqlalchemy
▶️ 6. Ejecutar servidor
uvicorn main:app --reload

👉 Esto levantará el backend en:

http://localhost:8000
⚙️ CONFIGURACIÓN DEL FRONTEND
📂 7. Ir a la carpeta frontend
cd frontend
📦 8. Instalar dependencias
npm install
▶️ 9. Ejecutar aplicación
npm run dev

👉 Abre en tu navegador:

http://localhost:5173
🧪 USO DE LA APLICACIÓN

Ingresa un producto en el formulario

Presiona Guardar Producto

Verás el producto en la tabla

Puedes:

✏️ Editarlo

🗑️ Eliminarlo

📊 Exportarlo a CSV

🎨 DISEÑO Y MANTENIBILIDAD

El sistema utiliza un archivo:

theme.css

Donde se centralizan:

Colores

Espaciados

Bordes

Sombras

👉 Esto permite cambiar el diseño completo modificando solo un archivo.

🤖 USO DE IA

Se utilizó inteligencia artificial como apoyo en:

Generación de arquitectura

Mejora de código

Optimización de UI/UX

Consulta el archivo:

PROMPTS.md
📌 POSIBLES MEJORAS FUTURAS

🔍 Filtro por categoría

📄 Paginación

🔐 Autenticación de usuarios

🌙 Modo oscuro

☁️ Despliegue en la nube

👨‍💻 Autor

Arnol Garzón

⭐ Conclusión

Este proyecto fue desarrollado aplicando:

Buenas prácticas de desarrollo

Código limpio

Separación de responsabilidades

Enfoque en experiencia de usuario