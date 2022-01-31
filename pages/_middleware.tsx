import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  // check for token
  const token = await getToken({ req, secret: process.env.JWT_SECRET! }) // ! is non null assertion operator

  const { pathname } = req.nextUrl // where the request is headed next
  // allow the request if the following is true
  // 1. It's a requst for next-auth session & provider fetching s
  // 2. The token exist
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect them to login if they don't have token AND are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
