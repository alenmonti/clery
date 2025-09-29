import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => doc.data());
        
        // Crear un mapa de categorías con conteo de productos
        const categoryMap = {};
        products.forEach((product) => {
          if (product.category) {
            if (!categoryMap[product.category]) {
              categoryMap[product.category] = {
                name: product.category,
                count: 0,
                image: product.image || null,
                description: `Descubre nuestra colección de ${product.category.toLowerCase()}`,
              };
            }
            categoryMap[product.category].count++;
          }
        });

        setCategories(Object.values(categoryMap));
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-gray-200 h-8 w-48 rounded animate-pulse mb-4"></div>
          <div className="bg-gray-200 h-4 w-64 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-6 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Categorías
        </h1>
        <p className="text-lg text-gray-600">
          Explora nuestra colección organizada por estilos y tipos
        </p>
      </div>

      {/* Grid de categorías */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Imagen de la categoría */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg
                      className="w-16 h-16 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-.67-.33-1.27-.84-1.63L17.63 5.84zM16 7l2 2H5V7h11z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay con contador */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-sm font-medium">
                    {category.count} productos
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
                
                {/* Indicador de enlace */}
                <div className="flex items-center mt-4 text-primary-600 text-sm font-medium">
                  <span>Ver productos</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-black mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-.67-.33-1.27-.84-1.63L17.63 5.84zM16 7l2 2H5V7h11z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay categorías disponibles
          </h3>
          <p className="text-gray-600">
            Las categorías aparecerán automáticamente cuando agregues productos
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 bg-primary-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-gray-600 mb-6">
          Explora todos nuestros productos o contáctanos para solicitudes especiales
        </p>
        <div className="space-x-4">
          <Link
            to="/products"
            className="btn-primary"
          >
            Ver todos los productos
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}