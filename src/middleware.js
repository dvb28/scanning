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
    
    // Check acccess token is Expired
    if (acIsExpired) {

      // Check refreshToken is expired
      const rfIsExpired = await isTokenExpired(token.refreshToken);

      // If refreshToken is not expired
      if (rfIsExpired === false) {
        // Get userData from cookie
        const userCookie = req.cookies.get('userData')?.value;

        // Get status, data from response
        const { status, data } = await fetcherPost('/auth/refresh-access-token', { refreshToken: token.refreshToken });

        // If status === 200, set cookie
        if (status === 200) {
          // Set user cookie
          response.cookies.set('userData', userCookie);

          // Set token cookie
          response.cookies.set('token', JSON.stringify(data));

          // Next
          return response;
        }

        // Route Login
        return login;
      } else { return login }
    } else { return response  }
  }
};

// Matching cho route nào
export const config = {
  matcher: ['/views/:path*', '/layout/:path*'],
};
