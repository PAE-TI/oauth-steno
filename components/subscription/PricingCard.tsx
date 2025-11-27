import { CheckoutButton } from './CheckoutButton'

export function PricingCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Premium License</h3>
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-bold">$9</span>
          <span className="text-gray-600">/mes</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Acceso completo a todas las funcionalidades</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Soporte prioritario</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Actualizaciones automáticas</span>
        </li>
        <li className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Cancela cuando quieras</span>
        </li>
      </ul>

      <CheckoutButton />
    </div>
  )
}
