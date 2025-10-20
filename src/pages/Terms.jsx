export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
          Términos y Condiciones
        </h1>
        <p className="text-lg text-gray-600">
          Información importante sobre nuestras políticas de venta
        </p>
      </div>

      <div className="prose prose-lg mx-auto hidden">
        {/* Información general */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Información General</h2>
          <p className="text-gray-700 mb-4">
            Bienvenido a <strong>CLÉRY</strong>. Al realizar una compra en nuestro catálogo, 
            aceptas los siguientes términos y condiciones. Por favor, léelos detenidamente.
          </p>
        </div>

        {/* Formas de pago */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💳 Formas de Pago</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Transferencia bancaria</strong> (con descuento especial)</li>
            <li>• <strong>MercadoPago</strong> (tarjetas de débito y crédito)</li>
            <li>• <strong>Efectivo</strong> (solo para entregas en persona)</li>
          </ul>
        </section>

        {/* Envíos y entregas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Envíos y Entregas</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900">Entregas Locales:</h3>
              <ul className="space-y-1 ml-4">
                <li>• <strong>San Miguel y José C. Paz</strong>: Entrega gratuita</li>
                <li>• <strong>Horarios</strong>: Lunes a viernes de 9:00 a 20:00 hs</li>
                <li>• <strong>Sábados</strong>: De 9:00 a 17:00 hs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Envíos Nacionales:</h3>
              <ul className="space-y-1 ml-4">
                <li>• <strong>Correo Argentino</strong> y <strong>OCA</strong></li>
                <li>• <strong>Tiempo de entrega</strong>: 3 a 7 días hábiles</li>
                <li>• <strong>Costo</strong>: A cargo del comprador</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Política de cambios */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Política de Cambios</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Tienes 7 días</strong> desde la recepción para solicitar un cambio.
            </p>
            <h3 className="font-semibold text-gray-900">Condiciones para cambios:</h3>
            <ul className="space-y-1 ml-4">
              <li>• La prenda debe estar en <strong>perfectas condiciones</strong></li>
              <li>• Con <strong>etiquetas originales</strong></li>
              <li>• Sin uso, lavado o alteraciones</li>
              <li>• Presentar comprobante de compra</li>
            </ul>
            <p className="mt-4">
              <strong>Nota:</strong> Los gastos de envío para cambios corren por cuenta del cliente.
            </p>
          </div>
        </section>

        {/* Talles y medidas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📏 Talles y Medidas</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Consulta siempre la <strong>tabla de talles</strong> antes de realizar tu compra.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-yellow-800">
                <strong>💡 Tip:</strong> Si tienes dudas sobre el talle, ¡escríbenos por WhatsApp! 
                Te ayudamos a elegir la medida perfecta.
              </p>
            </div>
          </div>
        </section>

        {/* Stock y disponibilidad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Stock y Disponibilidad</h2>
          <div className="space-y-4 text-gray-700">
            <ul className="space-y-2">
              <li>• El stock se actualiza en <strong>tiempo real</strong></li>
              <li>• Nos reservamos el derecho de cancelar pedidos sin stock</li>
              <li>• En caso de cancelación, se reintegra el 100% del dinero</li>
              <li>• Tiempo de reintegro: 3 a 5 días hábiles</li>
            </ul>
          </div>
        </section>

        {/* Datos personales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Protección de Datos</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Tus datos personales están <strong>protegidos</strong> y solo se utilizan para:
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Procesar tu pedido</li>
              <li>• Coordinar la entrega</li>
              <li>• Comunicaciones relacionadas con tu compra</li>
              <li>• Ofertas especiales (solo si lo autorizas)</li>
            </ul>
            <p className="mt-4">
              <strong>No compartimos</strong> tu información con terceros sin tu consentimiento.
            </p>
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 Contacto y Consultas</h2>
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <p className="mb-4">¿Tienes alguna duda o consulta?</p>
            <div className="space-y-2">
              <p>
                <strong>WhatsApp:</strong> 
                <a href="https://wa.me/541130526311" className="text-green-400 hover:text-green-300 ml-2">
                  +54 11 3052-6311
                </a>
              </p>
              <p>
                <strong>Email:</strong>
                <a href="mailto:clery.sharongianella@gmail.com" className="text-blue-400 hover:text-blue-300 ml-2">
                  clery.sharongianella@gmail.com
                </a>
              </p>
              <p><strong>Instagram:</strong> @cleryoficial</p>
              <p><strong>TikTok:</strong> @cleryoficial</p>
            </div>
          </div>
        </section>

        {/* Modificaciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Modificaciones</h2>
          <div className="text-gray-700">
            <p>
              CLÉRY se reserva el derecho de modificar estos términos y condiciones 
              en cualquier momento. Las modificaciones entrarán en vigor inmediatamente 
              después de su publicación.
            </p>
            <p className="mt-4">
              <strong>Última actualización:</strong> Octubre 2025
            </p>
          </div>
        </section>

        {/* Aceptación */}
        <div className="bg-black text-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">Aceptación de Términos</h3>
          <p className="mb-4">
            Al realizar una compra en CLÉRY, confirmas que has leído, entendido 
            y aceptado estos términos y condiciones en su totalidad.
          </p>
          <p className="text-sm text-gray-300">
            ¡Gracias por confiar en nosotros! 💕
          </p>
        </div>
      </div>
    </div>
  );
}