'use client'

import { useState } from 'react'

interface Subscription {
  status: string
  stripe_current_period_end: string
  cancel_at_period_end: boolean
}

export function SubscriptionStatus({
  subscription,
}: {
  subscription: Subscription | null
}) {
  const [loading, setLoading] = useState(false)

  const handleManageSubscription = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      })

      const { url, error } = await response.json()

      if (error) {
        console.error('Portal error:', error)
        alert('Error al abrir el portal')
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Portal error:', error)
      alert('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No tienes una suscripción activa</p>
      </div>
    )
  }

  const isActive = subscription.status === 'active'
  const periodEnd = new Date(subscription.stripe_current_period_end)

  return (
    <div
      className={`border rounded-lg p-6 ${
        isActive
          ? 'bg-green-50 border-green-200'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Estado de Suscripción:{' '}
            <span
              className={isActive ? 'text-green-600' : 'text-gray-600'}
            >
              {isActive ? 'Activa' : subscription.status}
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {subscription.cancel_at_period_end
              ? `Se cancelará el ${periodEnd.toLocaleDateString()}`
              : `Próxima renovación: ${periodEnd.toLocaleDateString()}`}
          </p>
        </div>
      </div>

      <button
        onClick={handleManageSubscription}
        disabled={loading}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        {loading ? 'Cargando...' : 'Gestionar Suscripción'}
      </button>
    </div>
  )
}
