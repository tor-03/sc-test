import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

export function middleware(request: NextRequest) {
    const tokenCookie = request.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : null;

    const protectedRoutes = ['/collection-types', '/carpet-collections'];

    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}