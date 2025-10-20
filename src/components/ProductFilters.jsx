import { useState } from "react";

export default function ProductFilters({ onFilterChange, sections = [] }) {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name", // name, price-low, price-high, newest
  });

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "name",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== "name";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 hidden">
      {/* Toggle filters en mobile */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <h3 className="font-medium text-gray-900">Filtros</h3>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="text-primary-600 hover:text-primary-700"
        >
          {isFiltersOpen ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {/* Filtros */}
      <div className={`space-y-4 md:space-y-0 md:flex md:space-x-4 md:items-end ${isFiltersOpen ? 'block' : 'hidden md:flex'}`}>
        {/* Categoría */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            {sections.map((section) => (
              <option key={section.key} value={section.name}>
                {section.name}
              </option>
            ))}
          </select>
        </div>

        {/* Precio mínimo */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio mín.
          </label>
          <input
            type="number"
            placeholder="$0"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Precio máximo */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio máx.
          </label>
          <input
            type="number"
            placeholder="$999"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Ordenar por */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="name">Nombre</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>

        {/* Botón limpiar filtros */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Contador de filtros activos */}
      {hasActiveFilters && (
        <div className="mt-3 text-sm text-gray-600">
          Filtros activos: {[
            filters.category && `Categoría: ${filters.category}`,
            filters.minPrice && `Min: $${filters.minPrice}`,
            filters.maxPrice && `Max: $${filters.maxPrice}`,
            filters.sortBy !== "name" && `Orden: ${filters.sortBy}`
          ].filter(Boolean).join(", ")}
        </div>
      )}
    </div>
  );
}