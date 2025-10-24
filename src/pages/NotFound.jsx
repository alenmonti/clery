import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // Cambiar el título de la página
    document.title = "CLÉRY - Página no encontrada";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo/Título */}
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">
            CLÉRY
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Página no encontrada
          </p>
          <p className="text-gray-500">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="space-y-3">
          <Link
            to="/clery"
            className="w-full btn-primary inline-block"
          >
            Ir al inicio
          </Link>
          
          <Link
            to="/clery/products"
            className="w-full btn-secondary inline-block"
          >
            Ver productos
          </Link>
        </div>

        {/* Información adicional */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">
            ¿Necesitas ayuda?
          </p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>📱 WhatsApp: +54 11 3052-6311</p>
            <p>📧 clery.sharongianella@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}