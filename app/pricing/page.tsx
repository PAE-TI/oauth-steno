import { PricingCard } from '@/components/subscription/PricingCard'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PricingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single()

  if (subscription?.status === 'active') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              OAuth Steno
            </Link>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Elige tu Plan
          </h1>
          <p className="text-xl text-gray-600">
            Desbloquea todas las funcionalidades premium
          </p>
        </div>

        <div className="flex justify-center">
          <PricingCard />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Pagos seguros procesados por{' '}
            <span className="font-semibold">Stripe</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Cancela tu suscripción en cualquier momento
          </p>
        </div>
      </main>
    </div>
  )
}
