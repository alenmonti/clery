# CLERY - Moda 👗

Catálogo online de moda con estilo. Aplicación web moderna y responsive desarrollada con React + Firebase.

## 🚀 Características

- ✅ **Responsive y Mobile-first** - Diseñado para funcionar perfectamente en móviles y tablets
- ✅ **Carrito de compras** - Sistema completo de carrito con localStorage
- ✅ **Filtros dinámicos** - Filtrar por categoría, precio y ordenamiento
- ✅ **Menú desplegable** - Navegación móvil optimizada
- ✅ **Carga dinámica** - Productos desde Firebase + imágenes desde Cloudinary
- ✅ **Checkout vía WhatsApp** - Finalización de compra fácil y directa
- ✅ **Hosting gratuito** - Deplorable en GitHub Pages, Vercel o Netlify
- ✅ **Imágenes optimizadas** - CDN global con Cloudinary (10GB gratis)

## 🛠 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: TailwindCSS
- **Backend**: Firebase Firestore + Cloudinary (imágenes)
- **Routing**: React Router
- **Hosting**: GitHub Pages / Vercel / Netlify

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ y npm instalados
- Cuenta de Firebase gratuita
- Cuenta de Cloudinary gratuita

### 1. Clonar y configurar el proyecto

```bash
# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env
```

### 2. Configurar Firebase y Cloudinary

#### Firebase (Base de datos)
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita **solo Firestore Database** (no necesitamos Storage)
4. Obtén las credenciales del proyecto

#### Cloudinary (Imágenes)
1. Ve a [Cloudinary](https://cloudinary.com/) y crea una cuenta gratuita
2. En tu Dashboard, obtén:
   - Cloud Name
   - API Key (opcional para solo lectura)

5. Edita el archivo `.env` con tus credenciales:

```env
# Firebase (solo Firestore)
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Cloudinary (imágenes)
VITE_CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
```

### 3. Configurar Firestore

Crea una colección llamada `products` con documentos que tengan esta estructura:

```javascript
{
  name: "Remera Basic",
  price: 25.99,
  image: "https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/productos/remera-basic.jpg",
  category: "Remeras",
}
```

### 4. Ejecutar el proyecto

```bash
# Modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🔥 Firebase + Cloudinary Setup Detallado

### Configurar Firestore (Solo base de datos)

1. En Firebase Console, ve a **Firestore Database**
2. Crea la base de datos en modo **producción**
3. Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Productos: solo lectura pública
    match /products/{document} {
      allow read: if true;
      allow write: if false; // Solo via console por ahora
    }
  }
}
```

### Configurar Cloudinary (Imágenes gratuitas)

1. Ve a [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copia tu **Cloud Name** (es lo único que necesitas)
3. Para subir imágenes:
   - Arrastra y suelta en el Dashboard de Cloudinary
   - Crea una carpeta llamada `productos/`
   - Copia las URLs generadas para usar en Firestore

**Ventajas de Cloudinary vs Firebase Storage:**
- ✅ **10GB gratis** vs Firebase Storage de pago
- ✅ **Optimización automática** de imágenes
- ✅ **CDN global** para carga rápida
- ✅ **Redimensionado automático** para móviles

### Subir productos de ejemplo

Usa la consola de Firebase para agregar algunos productos de ejemplo:

```javascript
// Producto 1
{
  name: "Remera Básica Blanca",
  price: 19.99,
  category: "Remeras",
  image: "https://res.cloudinary.com/tu-cloud-name/image/upload/v1/productos/remera-blanca",
}

// Producto 2
{
  name: "Jean Skinny Azul",
  price: 45.50,
  category: "Pantalones",
  image: "https://res.cloudinary.com/tu-cloud-name/image/upload/v1/productos/jean-azul",
}
```

## 🚀 Deployment

### GitHub Pages

1. Instala gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Agrega al `package.json`:
```json
{
  "homepage": "https://tu-usuario.github.io/catalog-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploar:
```bash
npm run deploy
```

### Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Netlify

1. Sube la carpeta `dist` a Netlify
2. O conecta tu repositorio GitHub

## 📱 Funcionalidades

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en localStorage
- Cálculo automático de totales

### Filtros
- Por categoría
- Por rango de precios
- Ordenamiento (nombre, precio, fecha)

### Responsive Design
- Mobile-first approach
- Menú hamburguesa en móviles
- Grid adaptativo
- Imágenes optimizadas

### Checkout
- Integración con WhatsApp
- Mensaje automático con productos
- Cálculo total incluido

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para cambiar la paleta:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#tu-color-principal',
        600: '#tu-color-principal-oscuro',
      }
    }
  }
}
```

### Número de WhatsApp
Cambia el número en los componentes `Cart.jsx` y `Footer.jsx`:

```javascript
const whatsappUrl = `https://wa.me/TU_NUMERO_AQUI?text=${message}`;
```

## 🐛 Troubleshooting

### Error: Firebase not configured
- Verifica que el archivo `.env` exista y tenga las credenciales correctas
- Asegúrate de que las variables empiecen con `VITE_`

### Productos no se cargan
- Verifica las reglas de Firestore
- Confirma que la colección se llame `products`
- Revisa la consola del navegador para errores

### Imágenes no se muestran
- Verifica que las URLs de Cloudinary sean públicas
- Confirma que el Cloud Name sea correcto en `.env`
- Prueba abrir la URL de imagen directamente en el navegador

## 📄 Licencia

MIT © 2025 CLERY

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**¡Tu catálogo de ropa está listo! 🎉**

Para soporte o preguntas, contáctanos vía WhatsApp o email.