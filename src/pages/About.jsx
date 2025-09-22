export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sobre StyleCatalog
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
              En StyleCatalog creemos que la moda debe ser accesible para todos. 
              Nos dedicamos a ofrecer prendas de calidad que reflejen tu 
              personalidad única, sin comprometer tu presupuesto.
            </p>
          </div>
          <div className="bg-primary-50 p-6 rounded-lg">
            <div className="text-primary-600 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">
                Pasión por la moda
              </h3>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="bg-gray-50 p-6 rounded-lg order-2 md:order-1">
            <div className="text-gray-600 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
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

        <div className="bg-primary-600 text-white p-8 rounded-lg text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            ¿Por qué elegir StyleCatalog?
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
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:contacto@stylecatalog.com"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}