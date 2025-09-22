// Utilidad para agregar productos de ejemplo a Firestore
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const sampleProducts = [
  {
    name: "Remera Básica Blanca",
    price: 19.99,
    category: "Remeras",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    name: "Jean Skinny Azul",
    price: 45.99,
    category: "Pantalones",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
  {
    name: "Vestido Floreado",
    price: 35.50,
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
  },
  {
    name: "Zapatillas Deportivas",
    price: 79.99,
    category: "Calzado",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
  },
];

export const addSampleProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    
    for (const product of sampleProducts) {
      const docRef = await addDoc(productsCollection, product);
      console.log(`Producto agregado con ID: ${docRef.id} - ${product.name}`);
    }
    
    console.log('✅ Todos los productos de ejemplo han sido agregados exitosamente!');
    return true;
  } catch (error) {
    console.error('❌ Error agregando productos:', error);
    return false;
  }
};

// Función para ejecutar desde la consola del navegador
window.addSampleProducts = addSampleProducts;