import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;
    const user = token && verifyToken(token);

    if (!user) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }
}
