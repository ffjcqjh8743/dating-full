// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // пример редиректа
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

