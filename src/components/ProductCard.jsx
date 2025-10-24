import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function ProductCard({ product }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { currentTheme } = useTheme();

  const handleAddToCart = () => {
    addToCart(product);
    // Opcionalmente mostrar una notificación
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

  return (
    <div className="card group rounded border-none shadow-md">
      {/* Imagen del producto */}
      <Link to={`/clery/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded mb-3 bg-gray-100" style={{ aspectRatio: '4/5' }}>
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17l-3.5-3.5 1.41-1.41L9 14.17l6.09-6.09L16.5 9.5 9 17z" />
            </svg>
          </div>
        ) : (
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              display: imageLoading ? 'none' : 'block',
              objectPosition: 'center top'
            }}
          />
        )}
        
        {/* Badge de categoría */}
        {/* {product.category && (
          <div className="absolute bottom-2 right-2">
            <span className="bg-gray-300 text-white text-xs px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        )} */}
        
        {/* Badge de descuento */}
        {product.discount && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-base leading-tight">
          {product.nombre}
        </h3>
        
        {/* Precio */}
        <div className="flex items-center space-x-2 justify-between">
          <span className="text-base font-bold text-gray-900">
            ${product.precio}
          </span>
          {product.categoria && (
            <span 
              className="text-white text-xs px-2 py-1 rounded-full font-bold font-sans" 
              style={{ 
                backgroundColor: `${currentTheme.colors.buttonPrimary}33`, // Usa buttonPrimary que es más oscuro
                color: currentTheme.colors.buttonPrimary
              }}
            >
              {product.categoria}
            </span>
          )}
        </div>
      </div>
      </Link>

      {/* Botones de acción */}
      <div className="mt-3 space-y-1.5">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBuyNow();
          }}
          disabled={product.stock === 0}
          className={`w-full py-2 px-3 rounded font-medium transition-colors text-sm ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : ''
          }`}
          style={product.stock !== 0 ? {
            backgroundColor: currentTheme.colors.buttonPrimary,
            border: 'none',
            color: currentTheme.colors.buttonText
          } : {}}
          onMouseEnter={(e) => {
            if (product.stock !== 0) {
              e.target.style.backgroundColor = currentTheme.colors.buttonPrimaryHover;
            }
          }}
          onMouseLeave={(e) => {
            if (product.stock !== 0) {
              e.target.style.backgroundColor = currentTheme.colors.buttonPrimary;
            }
          }}
        >
          {product.stock === 0 ? 'Sin stock' : 'COMPRAR'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={product.stock === 0}
          className={`w-full py-1.5 px-3 rounded font-medium transition-colors text-sm ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : ''
          }`}
          style={product.stock !== 0 ? {
            backgroundColor: 'transparent',
            border: 'none',
            color: currentTheme.colors.buttonPrimary
          } : {}}
          onMouseEnter={(e) => {
            if (product.stock !== 0) {
              e.target.style.backgroundColor = currentTheme.colors.buttonPrimary;
              e.target.style.color = currentTheme.colors.buttonText;
              e.target.style.border = 'none';
            }
          }}
          onMouseLeave={(e) => {
            if (product.stock !== 0) {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = currentTheme.colors.buttonPrimary;
              e.target.style.border = 'none';
            }
          }}
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}