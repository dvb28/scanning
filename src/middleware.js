import { NextResponse } from 'next/server';


// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  let isPermission = true;

  if(request.nextUrl.pathname.startsWith('/layout')) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  if(isPermission === false) {
    return NextResponse.redirect(new URL('/404', request.url));
  } else {
    return NextResponse.next();
  }
}

// Matching cho route nào
export const config = {
  matcher: ['/views/:path*', '/layout/:path*'],
};
