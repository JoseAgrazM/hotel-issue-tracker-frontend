# 🛠️ Hotel Issue Tracker

¡Bienvenido/a a **Hotel Issue Tracker**!  
Este es mi proyecto final del curso, una aplicación web desarrollada con **React** (frontend) y **Node.js** (backend), pensada para gestionar y reportar incidencias en habitaciones de hotel de manera eficiente y moderna.

---

## 🚀 Características principales

-   🔄 **SPA** (Single Page Application) con React
-   📦 Gestión global de estado con **Redux Toolkit**
-   🌐 Enrutado inteligente con **React Router DOM**
-   📡 Comunicación con el backend vía **Axios**
-   ⚙️ Backend en **Node.js** con manejo de errores centralizado
-   🛢️ Base de datos relacional con **MySQL** usando **Prisma**
-   🧩 Interfaz moderna y responsive 100% con **Tailwind CSS**
-   📲 Modales personalizados con **SweetAlert2**
-   ☁️ Despliegue completo en **VPS** usando **Coolify**

---

## 📸 Vista previa

> _(Incluye aquí capturas de pantalla si lo deseas para mostrar la interfaz)_

---

## 🛠️ Tecnologías utilizadas

| Frontend      | Backend    | Otros                    |
| ------------- | ---------- | ------------------------ |
| React         | Node.js    | Prisma ORM               |
| Tailwind CSS  | Express.js | Coolify (despliegue)     |
| Redux Toolkit |            | SweetAlert2              |
| Axios         |            | MySQL (base de datos)    |
| React Router  |            | Nodemailer (WIP - Email) |

---

## 🧪 Funcionalidades en desarrollo o pendientes

-   🔐 Recuperación y cambio de contraseña mediante **email con token temporal** (expira a los 5 minutos)
-   📧 Integración con **Nodemailer** para envío de correos

---

## 📦 Cómo desplegar el proyecto en local

### 🔁 Requisitos previos

-   Node.js (versión 18+ recomendada)
-   MySQL instalado y corriendo
-   Git

---

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/hotel-issue-tracker.git
cd hotel-issue-tracker
```

### 2. Crea una base de datos MySQL
```bash
cd server
cp .env.example .env

Edita el archivo .env con tus datos reales:
.env (backend)
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/hotel_issues"
JWT_SECRET=clave_secreta_segura
PORT=3000

```

### 3. Configura las variables de entorno

```bash
 Frontend (/client):
cd ../client
cp .env.example .env

Contenido del .env:
# .env (frontend)
VITE_API_URL=http://localhost:3000/api

```
### 4. Instala las dependencias
```bash
🔧 Backend
cd ../server
npm install

🎨 Frontend
cd ../client
npm install

```

### 5. Configura Prisma y la base de datos

```bash
Desde la carpeta /server:
npx prisma generate
npx prisma migrate dev --name init

```

### 6. Ejecuta el backend

```bash
cd server
npm run dev

```

### 7. Ejecuta el frontend

```bash
cd client
npm run dev

```
