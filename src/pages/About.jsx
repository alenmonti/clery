export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sobre CLÉRY
        </h1>
        <p className="text-xl text-gray-600">
          Conoce la historia detrás de tu tienda de moda favorita
        </p>
      </div>

      <div className="prose prose-lg mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra misión
            </h2>
            <p className="text-gray-600 leading-relaxed">
              En CLÉRY creemos que la moda debe ser accesible para todos. 
              Nos dedicamos a ofrecer prendas de calidad que reflejen tu 
              personalidad única, sin comprometer tu presupuesto.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-black text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Pasión por la moda
              </h3>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="bg-gray-50 p-6 rounded-lg order-2 md:order-1">
            <div className="text-black text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.98 1.98 0 0 0 18 7c-.8 0-1.54.5-1.85 1.26l-1.92 5.76A2 2 0 0 0 16 16.67V22h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2.5 16v-7H6l1.5-3H9v-2H4v2h1.5L4 15h2v7h2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Comunidad unida
              </h3>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra historia
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Comenzamos como un pequeño emprendimiento familiar en 2023, 
              con la visión de democratizar la moda. Hoy somos una comunidad 
              que crece día a día, conectando personas a través del estilo y la autenticidad.
            </p>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-8 rounded-lg text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            ¿Por qué elegir CLÉRY?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div>Productos únicos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div>Clientes satisfechos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div>Atención al cliente</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Conecta con nosotros!
          </h2>
          <p className="text-gray-600 mb-6">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:contacto@CLÉRY.com"
              className="bg-gray-800 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}