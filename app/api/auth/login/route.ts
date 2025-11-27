import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    const supabase = await createClient()

    const { error } = await supabase
      .from('user_profiles')
      .update({
        last_login_ip: ip,
      })
      .eq('user_id', userId)

    if (error) {
      console.error('Error updating login IP:', error)
      return NextResponse.json(
        { error: 'Error al actualizar la IP de login' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in login route:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
