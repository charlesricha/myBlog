import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('firebaseIdToken');

  if (request.nextUrl.pathname.startsWith('/admin/new-post')) {
    if (!sessionCookie) {
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  if (request.nextUrl.pathname === '/admin') {
      if(sessionCookie) {
          return NextResponse.redirect(new URL('/admin/new-post', request.url))
      }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/new-post'],
}
