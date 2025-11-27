import { AuthButton } from '@/components/auth/AuthButton'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            OAuth Steno
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Inicia Sesión
          </h2>
          <p className="mt-2 text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <AuthButton />

          <div className="mt-6 text-center text-sm text-gray-600">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Términos de Servicio
            </a>{' '}
            y{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidad
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
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
