import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()
    
    const supabase = createRouteHandlerClient({ cookies })
    
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const loginIp = ip.split(',')[0].trim()

    const { error } = await supabase
      .from('user_profiles')
      .update({
        last_login_ip: loginIp,
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating login IP:', error)
      return NextResponse.json(
        { error: 'Error al actualizar IP de login' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in login API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
