import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <CartProvider>
      <Router>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Cart />
            <main>
              <Routes>
                <Route path="/clery" element={<Home />} />
                <Route path="/clery/products" element={<Products />} />
                <Route path="/clery/product/:id" element={<ProductDetail />} />
                <Route path="/clery/about" element={<About />} />
                <Route path="/clery/terms" element={<Terms />} />
                {/* Ruta catch-all para 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>
    </CartProvider>
  );
}

// Componente Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl text-white mb-8 text-center tracking-wider font-playfair">
              CLÉRY
            </h2>
            <div className="mt-4 text-center mb-4">
              <h4 className="text-sm ">Seguinos <span className="text-gray-400">@cleryoficial</span></h4>
            </div>
            {/* Redes Sociales */}
            <div className="flex space-x-6 mb-4 justify-center">
              <a
                href="https://wa.me/541130526311"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="WhatsApp"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/cleryoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="Instagram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@cleryoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                title="TikTok"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a
                href="mailto:clery.sharongianella@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
                title="Email"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/clery" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/clery/products" className="text-gray-300 hover:text-white transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/clery/terms" className="text-gray-300 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/clery/about" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto & Envíos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>📱 WhatsApp: +54 11 3052-6311</li>
              <li>💌 Correo: clery.sharongianella@gmail.com</li>
              <li>📦 Envíos a todo el país</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 CLÉRY. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Envíos a todo el país • @cleryoficial</p>
        </div>
      </div>
    </footer>
  );
}

export default App;