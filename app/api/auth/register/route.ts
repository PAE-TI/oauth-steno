import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId, firstName, lastName, email } = await request.json()

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    const supabase = await createClient()

    const { error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        registration_ip: ip,
        last_login_ip: ip,
      })

    if (error) {
      console.error('Error creating user profile:', error)
      return NextResponse.json(
        { error: 'Error al crear el perfil de usuario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in register route:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
