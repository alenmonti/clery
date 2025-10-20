import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
    nombre: "Sandalias de Verano", 
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

export default function ProductUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const uploadProducts = async () => {
    setUploading(true);
    setProgress(0);
    setResults([]);
    setShowResults(false);

    const uploadResults = [];

    try {
      for (let i = 0; i < sampleProducts.length; i++) {
        const product = sampleProducts[i];
        
        try {
          const docRef = await addDoc(collection(db, "products"), product);
          uploadResults.push({
            success: true,
            product: product.nombre,
            id: docRef.id
          });
          console.log(`✅ Subido: ${product.nombre}`);
        } catch (error) {
          uploadResults.push({
            success: false,
            product: product.nombre,
            error: error.message
          });
          console.error(`❌ Error: ${product.nombre}`, error);
        }

        setProgress(Math.round(((i + 1) / sampleProducts.length) * 100));
        
        // Pequeña pausa
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setResults(uploadResults);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error general:', error);
      alert('Error general: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        🚀 Subir Productos de Prueba
      </h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-900 mb-2">
          📦 Se subirán {sampleProducts.length} productos de prueba:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Nuevos Ingresos:</strong> 6 productos (3 mujer, 3 hombre)</li>
          <li>• <strong>Destacados:</strong> 5 productos adicionales</li>
          <li>• <strong>Gangas:</strong> 3 ofertas especiales</li>
          <li>• <strong>Accesorios:</strong> 4 complementos</li>
          <li>• <strong>Productos adicionales:</strong> 6 items variados</li>
        </ul>
      </div>

      {!uploading && !showResults && (
        <button
          onClick={uploadProducts}
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          🚀 Subir Productos a Firebase
        </button>
      )}

      {uploading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Subiendo productos...
            </span>
            <span className="text-sm text-gray-500">
              {progress}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-black h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            Por favor espera mientras se suben los productos...
          </p>
        </div>
      )}

      {showResults && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">
              ✅ Proceso Completado
            </h3>
            <div className="text-sm text-green-700">
              <p>• Productos subidos exitosamente: <strong>{successful}</strong></p>
              <p>• Productos con error: <strong>{failed}</strong></p>
            </div>
          </div>

          {failed > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">❌ Productos con errores:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {results.filter(r => !r.success).map((result, index) => (
                  <li key={index}>
                    • {result.product}: {result.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              🔄 Recargar Página
            </button>
            
            <button
              onClick={() => {
                setShowResults(false);
                setResults([]);
                setProgress(0);
              }}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              🔄 Subir Más
            </button>
          </div>
        </div>
      )}
    </div>
  );
}