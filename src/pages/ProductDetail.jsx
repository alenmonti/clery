import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currentTheme } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    // Mostrar confirmación
  };

  const handleBuyNow = () => {
    const message = `¡Hola CLÉRY! 👋 Me interesa este producto:\n\n📦 ${product.nombre}\n💰 Precio: $${product.precio}\n\n¿Está disponible? ¿Cómo coordino la compra?`;
    const whatsappUrl = `https://wa.me/541130526311?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Producto no encontrado"}
          </h1>
          <p className="text-gray-600 mb-6">
            El producto que buscas no existe o fué eliminado.
          </p>
          <Link
            to="/clery/products"
            className="btn-primary inline-block"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/clery" className="text-gray-500 hover:text-gray-700">
                Inicio
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link to="/clery/products" className="text-gray-500 hover:text-gray-700">
                Productos
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <span className="text-gray-900 font-medium">
                {product.nombre}
              </span>
            </li>
          </ol>
        </nav>

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="bg-white rounded shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded overflow-hidden" style={{ aspectRatio: '4/5' }}>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
                  </div>
                )}
                
                {imageError ? (
                  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-3.5-3.5 1.41-1.41L9 14.17l6.09-6.09L16.5 9.5 9 17z" />
                    </svg>
                    <p className="text-gray-500 text-sm">Imagen no disponible</p>
                  </div>
                ) : (
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-full h-full object-contain"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                )}

              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h1 
                  className="text-3xl font-bold mb-3"
                  style={{ color: currentTheme.colors.text }}
                >
                  {product.nombre}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categoria && (
                    <span 
                      className="inline-block text-sm px-3 py-1 rounded-full font-bold"
                      style={{ 
                        backgroundColor: `${currentTheme.colors.buttonPrimary}33`,
                        color: currentTheme.colors.buttonPrimary
                      }}
                    >
                      {product.categoria}
                    </span>
                  )}
                  
                  {product.nuevo && (
                    <span 
                      className="inline-block text-sm px-3 py-1 rounded-full font-bold"
                      style={{ 
                        backgroundColor: '#ef444433',
                        color: '#ef4444'
                      }}
                    >
                      Nuevo
                    </span>
                  )}
                  
                  {product.destacado && (
                    <span 
                      className="inline-block text-sm px-3 py-1 rounded-full font-bold"
                      style={{ 
                        backgroundColor: '#fbbf2433',
                        color: '#f59e0b'
                      }}
                    >
                      Destacado
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.precio}
                  </span>
                </div>

                {product.descripcion && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Descripción</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.descripcion}
                    </p>
                  </div>
                )}

                {product.tallas && product.tallas.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Tallas disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tallas.map((talla, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:border-gray-400 transition-colors"
                        >
                          {talla}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Detalles</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    {product.genero && (
                      <p><span className="font-medium">Género:</span> {product.genero}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3 pt-6">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-6 rounded font-medium text-lg transition-colors"
                  style={{
                    backgroundColor: currentTheme.colors.buttonPrimary,
                    border: 'none',
                    color: currentTheme.colors.buttonText
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = currentTheme.colors.buttonPrimaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = currentTheme.colors.buttonPrimary;
                  }}
                >
                  COMPRAR AHORA
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-6 rounded font-medium transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: currentTheme.colors.buttonPrimary
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = currentTheme.colors.buttonPrimary;
                    e.target.style.color = currentTheme.colors.buttonText;
                    e.target.style.border = 'none';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = currentTheme.colors.buttonPrimary;
                    e.target.style.border = 'none';
                  }}
                >
                  AGREGAR AL CARRITO
                </button>
              </div>

              {/* Información de contacto */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">¿Dudas sobre este producto?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📱 WhatsApp: +54 11 3052-6311</p>
                  <p>💌 Correo: clery.sharongianella@gmail.com</p>
                  <p>📦 Envíos a todo el país</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}