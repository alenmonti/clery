import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Opcionalmente mostrar una notificación
  };

  const handleBuyNow = () => {
    const message = `¡Hola CLERY! 👋 Me interesa este producto:\n\n📦 ${product.name}\n💰 Precio: $${product.price}\n\n¿Está disponible? ¿Cómo coordino la compra?`;
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
    <div className="card hover:shadow-md transition-shadow duration-200 group">
      {/* Imagen del producto */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
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
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}
        
        {/* Badge de categoría */}
        {product.category && (
          <div className="absolute top-2 left-2">
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}
        
        {/* Badge de descuento */}
        {product.discount && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
          {product.name}
        </h3>
        
        {/* Precio */}
        <div className="flex items-center space-x-2">
          {product.originalPrice && product.originalPrice > product.price ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 space-y-2">
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-none font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {product.stock === 0 ? 'Sin stock' : 'COMPRAR AHORA'}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-none font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-secondary text-sm'
          }`}
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
}