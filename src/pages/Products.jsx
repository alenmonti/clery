import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import ProductUploader from "../components/ProductUploader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [currentSubcategory, setCurrentSubcategory] = useState("");
  const location = useLocation();
  const { currentTheme, isMujerTheme, isHombreTheme } = useTheme();

  // Generar secciones principales y subcategorías dinámicas
  const generateSections = (productsData) => {
    const sections = [
      { name: 'Nuevos Ingresos', key: 'nuevos' },
      { name: 'Destacados', key: 'destacados' },
      { name: 'Gangas', key: 'gangas' },
      { name: 'Mujer', key: 'mujer' },
      { name: 'Hombre', key: 'hombre' },
      { name: 'Accesorios', key: 'accesorios' }
    ];

    // Generar subcategorías para Mujer y Hombre
    const mujerCategories = [...new Set(
      productsData
        .filter(p => p.genero === 'Mujer')
        .map(p => p.categoria)
        .filter(Boolean)
    )];

    const hombreCategories = [...new Set(
      productsData
        .filter(p => p.genero === 'Hombre')
        .map(p => p.categoria)
        .filter(Boolean)
    )];

    return sections.map(section => {
      if (section.key === 'mujer') {
        return { ...section, subcategories: mujerCategories };
      }
      if (section.key === 'hombre') {
        return { ...section, subcategories: hombreCategories };
      }
      return section;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productsData);
        
        // Generar secciones dinámicamente
        const sectionsData = generateSections(productsData);
        setSections(sectionsData);
        
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
    const section = urlParams.get('section');
    const subcategory = urlParams.get('subcategory');
    const search = urlParams.get('search');
    const category = urlParams.get('category'); // Para compatibilidad con enlaces anteriores
    
    // Actualizar estados para mostrar en UI
    setCurrentSection(section ? decodeURIComponent(section) : "");
    setCurrentSubcategory(subcategory ? decodeURIComponent(subcategory) : "");
    setCurrentSearch(search ? decodeURIComponent(search) : "");
    
    let filtered = [...productsData];
    
    // Filtrar por sección
    if (section) {
      const sectionKey = decodeURIComponent(section);
      filtered = filterBySection(filtered, sectionKey);
    }
    
    // Filtrar por subcategoría (para Hombre/Mujer)
    if (subcategory) {
      const subcategoryName = decodeURIComponent(subcategory);
      filtered = filtered.filter(product => product.categoria === subcategoryName);
    }
    
    // Compatibilidad con enlaces antiguos de categorías
    if (category && !section) {
      const categoryName = decodeURIComponent(category);
      filtered = filtered.filter((product) => 
        product.categoria === categoryName
      );
    }
    
    // Filtrar por búsqueda si viene en la URL
    if (search) {
      const searchTerm = decodeURIComponent(search).toLowerCase();
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm) ||
        (product.categoria && product.categoria.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredProducts(filtered);
  };

  const filterBySection = (products, sectionKey) => {
    switch (sectionKey) {
      case 'nuevos':
        return products.filter(product => product.nuevo === true);
      case 'destacados':
        return products.filter(product => product.destacado === true);
      case 'gangas':
        return products.filter(product => product.categoria === 'Gangas');
      case 'accesorios':
        return products.filter(product => product.categoria === 'Accesorios');
      case 'mujer':
        return products.filter(product => product.genero === 'Mujer');
      case 'hombre':
        return products.filter(product => product.genero === 'Hombre');
      default:
        return products;
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Filtrar por categoría (ahora usando el campo 'categoria' en español)
    if (filters.category) {
      filtered = filtered.filter((product) => product.categoria === filters.category);
    }

    // Filtrar por precio mínimo (precio ahora es string, necesitamos parsearlo)
    if (filters.minPrice) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.precio?.replace(/[.$,]/g, '') || 0);
        return price >= parseFloat(filters.minPrice);
      });
    }

    // Filtrar por precio máximo
    if (filters.maxPrice) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.precio?.replace(/[.$,]/g, '') || 0);
        return price <= parseFloat(filters.maxPrice);
      });
    }

    // Ordenar
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.precio?.replace(/[.$,]/g, '') || 0);
          const priceB = parseFloat(b.precio?.replace(/[.$,]/g, '') || 0);
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.precio?.replace(/[.$,]/g, '') || 0);
          const priceB = parseFloat(b.precio?.replace(/[.$,]/g, '') || 0);
          return priceB - priceA;
        });
        break;
      case "newest":
        // Priorizar productos marcados como 'nuevo'
        filtered.sort((a, b) => {
          if (a.nuevo && !b.nuevo) return -1;
          if (!a.nuevo && b.nuevo) return 1;
          return 0;
        });
        break;
      default: // name
        filtered.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
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
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: currentTheme.colors.text }}
        >
          {currentSection ? (
            <>
              {currentSection === 'nuevos' && 'NUEVOS INGRESOS'}
              {currentSection === 'destacados' && 'DESTACADOS'}
              {currentSection === 'gangas' && 'GANGAS'}
              {currentSection === 'mujer' && 'MUJER'}
              {currentSection === 'hombre' && 'HOMBRE'}
              {currentSection === 'accesorios' && 'ACCESORIOS'}
            </>
          ) : (
            'PRODUCTOS'
          )}
        </h1>
        <div className="space-y-2">
          <p 
            className="text-gray-600"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {currentSection ? (
              <>
                {currentSection === 'nuevos' && 'Los últimos productos que llegaron'}
                {currentSection === 'destacados' && 'Nuestras mejores piezas seleccionadas'}
                {currentSection === 'gangas' && 'Ofertas imperdibles en productos seleccionados'}
                {currentSection === 'mujer' && 'Moda femenina para todos los estilos'}
                {currentSection === 'hombre' && 'Estilo masculino moderno y elegante'}
                {currentSection === 'accesorios' && 'Complementos perfectos para tu look'}
              </>
            ) : (
              'Descubre nuestra colección completa'
            )}
          </p>
          
          {/* Mostrar filtros activos */}
          {(currentSearch || currentSection || currentSubcategory) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {currentSearch && (
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm text-white"
                  style={{ backgroundColor: currentTheme.colors.text }}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  Buscando: "{currentSearch}"
                </span>
              )}
              {currentSection && (
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: currentTheme.colors.primary, color: currentTheme.colors.badgeText }}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {currentSection === 'nuevos' && 'Nuevos Ingresos'}
                  {currentSection === 'destacados' && 'Destacados'}
                  {currentSection === 'gangas' && 'Gangas'}
                  {currentSection === 'mujer' && 'Mujer'}
                  {currentSection === 'hombre' && 'Hombre'}
                  {currentSection === 'accesorios' && 'Accesorios'}
                </span>
              )}
              {currentSubcategory && (
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: currentTheme.colors.primaryHover, color: currentTheme.colors.badgeText }}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-.67-.33-1.27-.84-1.63L17.63 5.84zM16 7l2 2H5V7h11z" />
                  </svg>
                  {currentSubcategory}
                </span>
              )}
              
              {/* Contador de resultados */}
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: currentTheme.colors.accent, color: currentTheme.colors.counterText }}
              >
                {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        sections={sections}
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
        <div className="space-y-8">
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
            <p className="text-gray-600 mb-6">
              Para comenzar a probar la aplicación, puedes subir algunos productos de ejemplo
            </p>
          </div>
          
          {/* Componente para subir productos de prueba */}
          <ProductUploader />
        </div>
      )}
    </div>
  );
}