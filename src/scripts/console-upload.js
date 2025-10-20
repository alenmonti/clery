// Script para ejecutar en la consola del navegador
// Abre la app en el navegador y ejecuta este código en la consola (F12)

// Función para subir productos de prueba
async function subirProductosPrueba() {
  // Importar Firebase desde el contexto global (si está disponible)
  const { collection, addDoc } = window.firebase || {};
  const db = window.db || {};
  
  if (!collection || !addDoc || !db) {
    console.error("❌ Firebase no está disponible. Asegúrate de estar en la página de la app.");
    return;
  }

  const sampleProducts = [
    // NUEVOS INGRESOS - MUJER
    {
      nombre: "Remera Básica Blanca",
      categoria: "Remeras",
      genero: "Mujer",
      precio: "8.500",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: true,
      destacado: false
    },
    {
      nombre: "Vestido Floral Primavera",
      categoria: "Vestidos", 
      genero: "Mujer",
      precio: "15.900",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: true,
      destacado: true
    },
    {
      nombre: "Jeans Skinny Azul",
      categoria: "Pantalones",
      genero: "Mujer", 
      precio: "12.700",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: true,
      destacado: false
    },
    
    // NUEVOS INGRESOS - HOMBRE
    {
      nombre: "Camisa Formal Blanca",
      categoria: "Remeras",
      genero: "Hombre",
      precio: "11.200",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: true,
      destacado: false
    },
    {
      nombre: "Pantalón Chino Beige", 
      categoria: "Pantalones",
      genero: "Hombre",
      precio: "13.800",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: true,
      destacado: true
    },
    {
      nombre: "Zapatillas Deportivas Nike",
      categoria: "Calzado",
      genero: "Hombre",
      precio: "25.500",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg", 
      nuevo: true,
      destacado: true
    },
    
    // DESTACADOS - MUJER
    {
      nombre: "Blazer Ejecutivo Negro",
      categoria: "Chaquetas",
      genero: "Mujer",
      precio: "22.900",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: false,
      destacado: true
    },
    {
      nombre: "Falda Plisada Midi",
      categoria: "Faldas", 
      genero: "Mujer",
      precio: "9.800",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: false,
      destacado: true
    },
    
    // GANGAS
    {
      nombre: "Pack 3 Remeras Básicas",
      categoria: "Gangas",
      genero: "No",
      precio: "14.900",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: false,
      destacado: false
    },
    {
      nombre: "Shorts de Verano - Oferta",
      categoria: "Gangas", 
      genero: "No",
      precio: "6.500",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: false,
      destacado: false
    },
    
    // ACCESORIOS
    {
      nombre: "Cartera de Cuero Negra", 
      categoria: "Accesorios",
      genero: "Mujer",
      precio: "18.700",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
      nuevo: false,
      destacado: false
    },
    {
      nombre: "Reloj Digital Deportivo",
      categoria: "Accesorios",
      genero: "Hombre",
      precio: "12.300",
      imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg", 
      nuevo: false,
      destacado: false
    }
  ];

  try {
    console.log("🚀 Comenzando subida de productos de prueba...");
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = sampleProducts[i];
      
      try {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log(`✅ ${i + 1}/${sampleProducts.length}: ${product.nombre}`);
      } catch (error) {
        console.error(`❌ Error al subir ${product.nombre}:`, error);
      }
      
      // Pausa pequeña
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log("🎉 ¡Productos de prueba subidos exitosamente!");
    console.log("🔄 Recarga la página para ver los productos.");
    
  } catch (error) {
    console.error("💥 Error:", error);
  }
}

// Ejecutar automáticamente
console.log("📦 Script de productos de prueba cargado.");
console.log("🚀 Ejecuta: subirProductosPrueba()");