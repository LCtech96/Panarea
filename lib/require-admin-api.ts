import { NextRequest, NextResponse } from 'next/server'

function unauthorizedResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'Non autorizzato',
    },
    { status: 401 }
  )
}

/**
 * Guard per API admin lato server.
 * Accetta una delle seguenti credenziali:
 * - header x-admin-api-key
 * - Authorization: Bearer <secret>
 * - cookie admin_session
 */
export async function requireAdminSession(request: NextRequest): Promise<NextResponse | null> {
  const secret = process.env.ADMIN_AUTH_SECRET

  if (!secret) {
    return NextResponse.json(
      {
        success: false,
        error: 'Configurazione admin mancante (ADMIN_AUTH_SECRET)',
      },
      { status: 500 }
    )
  }

  const apiKey = request.headers.get('x-admin-api-key')
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null
  const sessionCookie = request.cookies.get('admin_session')?.value

  const isAuthorized = [apiKey, bearerToken, sessionCookie].some((value) => value === secret)
  if (!isAuthorized) return unauthorizedResponse()

  return null
}
