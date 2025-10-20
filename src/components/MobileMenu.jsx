import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function MobileMenu({ isOpen, onClose }) {
  const [isProductsSubMenuOpen, setIsProductsSubMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => doc.data());
        
        // Crear un mapa de categorías únicas
        const categorySet = new Set();
        products.forEach((product) => {
          if (product.category) {
            categorySet.add(product.category);
          }
        });
        
        setCategories(Array.from(categorySet));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirigir a productos con búsqueda
      window.location.href = `/clery/products?search=${encodeURIComponent(searchQuery.trim())}`;
      onClose();
    }
  };



  const handleLinkClick = () => {
    setIsProductsSubMenuOpen(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel del menú */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 md:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h2 className="text-2xl md:text-3xl mb-2 text-gradient font-playfair tracking-wider">CLÉRY</h2>
          <button
            onClick={onClose}
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

        {/* Contenido del menú */}
        <div className="flex-1 overflow-y-auto">
          {/* Buscador */}
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              ¿Qué estás buscando?
            </h3>
            <form onSubmit={handleSearchSubmit} className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Menú principal */}
          <div className="p-4">
            <ul className="space-y-1">
              {/* INICIO */}
              <li>
                <Link
                  to="/clery"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  onClick={handleLinkClick}
                >
                  INICIO
                </Link>
              </li>

              {/* PRODUCTOS */}
              <li>
                <button
                  onClick={() => setIsProductsSubMenuOpen(!isProductsSubMenuOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  <div className="flex items-center">
                    PRODUCTOS
                  </div>
                  <svg
                    className={`w-4 h-4 text-black transition-transform duration-200 ${
                      isProductsSubMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>

                {/* Submenú de categorías */}
                {isProductsSubMenuOpen && (
                  <div className="mt-2 ml-8 space-y-1">
                    <Link
                      to="/clery/products"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={handleLinkClick}
                    >
                      Todos los productos
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/clery/products?category=${encodeURIComponent(category)}`}
                        onClick={handleLinkClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* TÉRMINOS Y CONDICIONES */}
              <li>
                <Link
                  to="/clery/terms"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  onClick={handleLinkClick}
                >
                  TÉRMINOS Y CONDICIONES
                </Link>
              </li>

              {/* NOSOTROS */}
              <li>
                <Link
                  to="/clery/about"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  onClick={handleLinkClick}
                >
                  NOSOTROS
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="border-t p-4 mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4 text-center">Síguenos</h4>
            
            {/* Íconos de redes sociales */}
            <div className="flex justify-center space-x-6 mb-4">
              <a
                href="https://wa.me/541130526311"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                title="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/cleryoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@cleryoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                title="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="mailto:clery.sharongianella@gmail.com"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Email"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
            
            {/* Información de contacto en texto pequeño */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">@cleryoficial</p>
              <p className="text-xs text-gray-500">📱 +54 11 3052-6311</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}