import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, LogOut, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('nombre'));
      const querySnapshot = await getDocs(q);
      const productosArray = [];
      querySnapshot.forEach((doc) => {
        productosArray.push({ id: doc.id, ...doc.data() });
      });
      setProductos(productosArray);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de eliminar "${nombre}"?`)) return;
    
    setDeleting(id);
    try {
      await deleteDoc(doc(db, 'products', id));
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/clery');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-600">Gestiona tus productos de CLERY</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/clery')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Eye size={16} />
                Ver Tienda
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
            <p className="text-sm text-gray-600">{productos.length} productos totales</p>
          </div>
          <button
            onClick={() => navigate('/clery/admin/producto/nuevo')}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus size={20} />
            Agregar Producto
          </button>
        </div>

        {/* Products Grid */}
        {productos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
            <p className="text-gray-600 mb-6">Comienza agregando tu primer producto</p>
            <button
              onClick={() => navigate('/clery/admin/producto/nuevo')}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Agregar Producto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {/* Imagen del producto */}
                <div className="aspect-square bg-gray-100">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 truncate flex-1">
                      {producto.nombre}
                    </h3>
                    <div className="flex gap-1 ml-2">
                      {producto.destacado && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                          Destacado
                        </span>
                      )}
                      {producto.nuevo && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          Nuevo
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3 space-y-1">
                    <p><span className="font-medium">Categoría:</span> {producto.categoria}</p>
                    <p><span className="font-medium">Género:</span> {producto.genero}</p>
                    <p className="font-semibold text-lg text-gray-900">${producto.precio}</p>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/clery/admin/producto/editar/${producto.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      disabled={deleting === producto.id}
                    >
                      <Edit size={14} />
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(producto.id, producto.nombre)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      disabled={deleting === producto.id}
                    >
                      {deleting === producto.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}