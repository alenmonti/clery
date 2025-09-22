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
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
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
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
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

      {/* Botón de agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors btn-primary hover:shadow-md"
      >
        'Agregar al carrito'
      </button>
    </div>
  );
}