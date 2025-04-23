import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api/favorites/locations")) {
      return NextResponse.next();
    } 
    
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname); 

    const publicPaths = ["/", "/show-item", "/show-items", "/api/items", "/not-found", "/register", "/signup", "/filter", "/login"];
    const pPaths = ["/", "/show-item", "/not-found", "/show-items", "/api/items", "/profile", "/register", "/review", "/signup", "/map", "/filter", "/login", "/addRoom"];

     if (!pathname.startsWith("/details/") && !pPaths.includes(pathname)) {
       return NextResponse.redirect(new URL("/not-found", request.url));
    }

    if (!isAuthenticated && !publicPaths.includes(pathname) && !pathname.startsWith("/details/")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
 
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/addRoom/:path*",
    "/review/:path*",
  ]
}; 

export default middleware;
