import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productsData);
        
        // Extraer categorías únicas
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
        
        // Aplicar filtros iniciales basados en URL
        applyInitialFilters(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location]);

  const applyInitialFilters = (productsData) => {
    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    // Actualizar estados para mostrar en UI
    setCurrentCategory(category ? decodeURIComponent(category) : "");
    setCurrentSearch(search ? decodeURIComponent(search) : "");
    
    let filtered = [...productsData];
    
    // Filtrar por categoría si viene en la URL
    if (category) {
      filtered = filtered.filter((product) => 
        product.category === decodeURIComponent(category)
      );
    }
    
    // Filtrar por búsqueda si viene en la URL
    if (search) {
      const searchTerm = decodeURIComponent(search).toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.category && product.category.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Filtrar por precio mínimo
    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(filters.minPrice));
    }

    // Filtrar por precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(filters.maxPrice));
    }

    // Ordenar
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        break;
      default: // name
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-gray-200 h-8 w-48 rounded animate-pulse mb-4"></div>
          <div className="bg-gray-200 h-4 w-64 rounded animate-pulse"></div>
        </div>
        
        {/* Skeleton del filtro */}
        <div className="bg-gray-200 h-20 rounded-lg animate-pulse mb-6"></div>
        
        {/* Skeleton de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-gray-200 h-6 rounded w-1/2 mb-4"></div>
              <div className="bg-gray-200 h-10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          PRODUCTOS
        </h1>
        <div className="space-y-2">
          <p className="text-gray-600">
            Descubre nuestra colección completa
          </p>
          
          {/* Mostrar filtros activos */}
          {(currentSearch || currentCategory) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {currentSearch && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-black text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  Buscando: "{currentSearch}"
                </span>
              )}
              {currentCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-700 text-white">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-.67-.33-1.27-.84-1.63L17.63 5.84zM16 7l2 2H5V7h11z" />
                  </svg>
                  Categoría: {currentCategory}
                </span>
              )}
              
              {/* Contador de resultados */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        categories={categories}
      />


      {/* Grid de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-black mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8s0-6-6-6zM6 20V4h7v5h5v11H6z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar los filtros para ver más resultados
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-black mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay productos disponibles
          </h3>
          <p className="text-gray-600">
            Pronto agregaremos nueva mercancía a nuestro catálogo
          </p>
        </div>
      )}
    </div>
  );
}