import { NextResponse } from 'next/server';
import { isTokenExpired } from '@/utils/token';
import { fetcherPost } from './utils/fetcher';

// This function can be marked `async` if using `await` inside
export const middleware = async (req) => {
    // Response
    const response = NextResponse.next();

    // Response Login Route
    const login = NextResponse.redirect(new URL('/auth/login', req.url));

    // Get Cookie
    const tokenCookie = req.cookies.get('token')?.value;

    // Get token
    const token = tokenCookie ? JSON.parse(tokenCookie) : null;

    // Variable Is Not Permisson
    const acIsExpired = token ? await isTokenExpired(token.accessToken) : true;

    // Check cookie has token
    if (!!token === false) { return login } else {
      // Check current path and return route
      return acIsExpired ? login : response;
    }
};

// Matching cho route nào
export const config = {
    matcher: ['/views/:path*', '/layout/:path*'],
};
