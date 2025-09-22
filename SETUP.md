# 🚀 Setup Rápido para tu Catálogo

## Paso 1: Instalar Node.js
Si no tienes Node.js instalado:
1. Ve a https://nodejs.org/
2. Descarga la versión LTS
3. Instala siguiendo las instrucciones

## Paso 2: Instalar dependencias
```bash
npm install
```

## Paso 3: Configurar Firebase
1. Ve a https://console.firebase.google.com/
2. Crea un nuevo proyecto
3. Habilita **Firestore** y **Storage**
4. Copia las credenciales al archivo `.env`

## Paso 4: Agregar productos
En Firestore, crea una colección "products" con documentos como:
```json
{
  "name": "Remera Básica",
  "price": 25,
  "image": "URL_DE_IMAGEN",
  "category": "Remeras",
}
```

## Paso 5: Ejecutar
```bash
npm run dev
```

## 🎯 URLs útiles después del setup
- Local: http://localhost:5173
- Firebase Console: https://console.firebase.google.com/
- Vercel Deploy: https://vercel.com/

## 📞 Personalizar WhatsApp
Busca y reemplaza `1234567890` con tu número real en:
- `src/components/Cart.jsx`
- `src/pages/About.jsx`
- `src/App.jsx` (Footer)

¡Tu catálogo estará listo en minutos! 🎉