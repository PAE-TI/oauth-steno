import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, firstName, lastName, email } = await request.json()
    
    const supabase = createRouteHandlerClient({ cookies })
    
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const registrationIp = ip.split(',')[0].trim()

    const { error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        registration_ip: registrationIp,
        last_login_ip: registrationIp,
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
    console.error('Error in register API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
