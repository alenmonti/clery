// Colores y configuración para categorías en español
export const categoryColors = {
  // Categorías principales
  'Remeras': {
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
    icon: 'shirt'
  },
  'Pantalones': {
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700', 
    borderColor: 'border-cyan-200',
    buttonColor: 'bg-cyan-600 hover:bg-cyan-700',
    icon: 'pants'
  },
  'Vestidos': {
    color: 'pink',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200', 
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
    icon: 'dress'
  },
  'Calzado': {
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    icon: 'shoe'
  },
  'Accesorios': {
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    buttonColor: 'bg-amber-600 hover:bg-amber-700',
    icon: 'accessories'
  },
  'Gangas': {
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    icon: 'tag'
  },
  'Jeans': {
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icon: 'jeans'
  },
  'Chaquetas': {
    color: 'gray',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200',
    buttonColor: 'bg-gray-600 hover:bg-gray-700',
    icon: 'jacket'
  },
  'Faldas': {
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    icon: 'skirt'
  },
  'Tops': {
    color: 'rose',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    buttonColor: 'bg-rose-600 hover:bg-rose-700',
    icon: 'top'
  }
};

// Colores para secciones especiales
export const sectionColors = {
  'nuevos': {
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
    icon: 'sparkles'
  },
  'destacados': {
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
    icon: 'star'
  },
  'gangas': {
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    icon: 'tag'
  },
  'mujer': {
    color: 'pink',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
    icon: 'user-female'
  },
  'hombre': {
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icon: 'user-male'
  },
  'accesorios': {
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    buttonColor: 'bg-amber-600 hover:bg-amber-700',
    icon: 'accessories'
  }
};

// Color por defecto
export const defaultCategoryColor = {
  color: 'gray',
  bgColor: 'bg-gray-50',
  textColor: 'text-gray-700',
  borderColor: 'border-gray-200',
  buttonColor: 'bg-gray-600 hover:bg-gray-700',
  icon: 'tag'
};

// Función para obtener colores de categoría
export function getCategoryColor(categoria) {
  return categoryColors[categoria] || defaultCategoryColor;
}

// Función para obtener colores de sección
export function getSectionColor(section) {
  return sectionColors[section] || defaultCategoryColor;
}

// Función para obtener el color del botón de compra
export function getBuyButtonColor(categoria) {
  const colors = getCategoryColor(categoria);
  return colors.buttonColor;
}