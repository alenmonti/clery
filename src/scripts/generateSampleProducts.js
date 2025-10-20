import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";

// Productos de prueba con la nueva estructura en español
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
  {
    nombre: "Botas de Cuero Marrón",
    categoria: "Calzado",
    genero: "Mujer",
    precio: "28.400",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: true
  },

  // DESTACADOS - HOMBRE
  {
    nombre: "Chaqueta de Cuero",
    categoria: "Chaquetas", 
    genero: "Hombre",
    precio: "45.600",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: true
  },
  {
    nombre: "Jeans Clásico Azul Oscuro",
    categoria: "Pantalones",
    genero: "Hombre", 
    precio: "16.200",
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
  {
    nombre: "Medias Pack x6 Pares",
    categoria: "Gangas",
    genero: "No", 
    precio: "4.200",
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
  },
  {
    nombre: "Gorra Snapback Negra",
    categoria: "Accesorios",
    genero: "No",
    precio: "7.800",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },
  {
    nombre: "Cinturón de Cuero Marrón",
    categoria: "Accesorios", 
    genero: "Hombre",
    precio: "9.600",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },

  // PRODUCTOS ADICIONALES MUJER
  {
    nombre: "Top Deportivo Rosa",
    categoria: "Tops",
    genero: "Mujer",
    precio: "6.900", 
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },
  {
    nombre: "Leggings Negros Deportivos",
    categoria: "Pantalones",
    genero: "Mujer",
    precio: "8.400",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },
  {
    nombre: "Sandallas de Verano", 
    categoria: "Calzado",
    genero: "Mujer",
    precio: "11.800",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },

  // PRODUCTOS ADICIONALES HOMBRE
  {
    nombre: "Polo Clásico Azul",
    categoria: "Remeras", 
    genero: "Hombre",
    precio: "10.500",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  },
  {
    nombre: "Bermudas de Algodón",
    categoria: "Pantalones",
    genero: "Hombre",
    precio: "9.200",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false, 
    destacado: false
  },
  {
    nombre: "Mocasines de Cuero",
    categoria: "Calzado",
    genero: "Hombre",
    precio: "32.100",
    imagen: "https://res.cloudinary.com/dbvam1i0z/image/upload/v1758527244/remera_mu9zdk.jpg",
    nuevo: false,
    destacado: false
  }
];

// Función para subir productos a Firebase
export async function uploadSampleProducts() {
  try {
    console.log("🚀 Comenzando subida de productos de prueba...");
    
    const results = [];
    
    for (let i = 0; i < sampleProducts.length; i++) {
      const product = sampleProducts[i];
      
      try {
        const docRef = await addDoc(collection(db, "products"), product);
        console.log(`✅ Producto ${i + 1}/${sampleProducts.length}: ${product.nombre} - ID: ${docRef.id}`);
        results.push({ success: true, id: docRef.id, product: product.nombre });
      } catch (error) {
        console.error(`❌ Error al subir ${product.nombre}:`, error);
        results.push({ success: false, product: product.nombre, error: error.message });
      }
      
      // Pequeña pausa para no sobrecargar Firebase
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n📊 RESUMEN:`);
    console.log(`✅ Productos subidos exitosamente: ${successful}`);
    console.log(`❌ Productos fallidos: ${failed}`);
    
    if (failed > 0) {
      console.log("\n❌ Productos que fallaron:");
      results.filter(r => !r.success).forEach(r => {
        console.log(`   • ${r.product}: ${r.error}`);
      });
    }
    
    return results;
    
  } catch (error) {
    console.error("💥 Error general:", error);
    throw error;
  }
}

// Si ejecutas este archivo directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  uploadSampleProducts()
    .then(() => {
      console.log("\n🎉 ¡Proceso completado!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Error en el proceso:", error);
      process.exit(1);
    });
}