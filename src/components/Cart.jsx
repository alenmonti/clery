import { useCart } from "../context/CartContext";
import { useEffect } from "react";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  // Prevenir scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    // Mensaje para WhatsApp de Cléry
    const message = `¡Hola CLÉRY! 👋 Me interesa comprar:\n\n${cart
      .map(
        (item) => {
          const name = item.nombre || item.name; // Compatibilidad con ambos formatos
          const price = item.precio ? parseFloat(item.precio.replace(/[.$,]/g, '')) : (item.price || 0);
          return `• ${name} (x${item.quantity}) - $${(price * item.quantity).toFixed(2)}`;
        }
      )
      .join('\n')}\n\n💰 Total: $${getCartTotal().toFixed(2)}\n\n📍 ¿Coordino entrega en San Miguel o José C. Paz?`;
    
    const whatsappUrl = `https://wa.me/541130526311?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Panel del carrito */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 md:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          height: '100vh',
          height: '100dvh', // Para navegadores que soportan dvh
          backgroundColor: '#ffffff'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-semibold text-gray-900">
            Carrito de compras
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto bg-white">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white">
              <svg
                className="w-16 h-16 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm">Agrega productos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.imagen || item.image}
                    alt={item.nombre || item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.nombre || item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ${item.precio || item.price}
                    </p>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Precio total y botón eliminar */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(() => {
                        const price = item.precio ? parseFloat(item.precio.replace(/[.$,]/g, '')) : (item.price || 0);
                        return (price * item.quantity).toFixed(2);
                      })()}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y acciones */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-white">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            
            {/* Botones de acción */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full btn-primary rounded"
              >
                Finalizar compra
              </button>
              <button
                onClick={clearCart}
                className="w-full btn-secondary rounded border-none"
              >
                Vaciar carrito
              </button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Al finalizar serás redirigido a WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}