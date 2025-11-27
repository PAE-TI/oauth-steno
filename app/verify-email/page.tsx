import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center">
        <div>
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verifica tu Email
          </h1>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace de verificación a tu correo electrónico.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">Próximos pasos:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>Revisa tu bandeja de entrada</li>
            <li>Haz clic en el enlace de verificación</li>
            <li>Inicia sesión con tu cuenta verificada</li>
          </ol>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-4">
            ¿No recibiste el email? Revisa tu carpeta de spam o correo no deseado.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir a Iniciar Sesión
          </Link>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
