// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*", "/profile/:path*"] };

import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const user = request.nextauth.token?.user;

        const protectedRoutes = ["/verification", "/", "/profile"];

        if (protectedRoutes.includes(request.nextUrl.pathname)) {
            
            if (user && user.status !== "ACTIVATED") {
                
                if (request.nextUrl.pathname !== "/verification") {
                    // Przekieruj na stronę weryfikacji
                    return NextResponse.redirect(new URL("/verification", request.url));
                }
            }
        }

        if (user && user.status === "ACTIVATED") {
            if (request.nextUrl.pathname === "/verification") {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, 
        },
    }
);

export const config = {
    matcher: ["/verification", "/", "/profile"], 
};

