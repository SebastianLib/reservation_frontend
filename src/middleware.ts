import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const user = request.nextauth.token?.user;
        const currentPath = request.nextUrl.pathname;
        
        // Protected and restricted routes definitions
        const protectedRoutes = ["/verification", "/profile", "/"];
        const restrictedRoutesForLoggedIn = ["/signin", "/signup"];

        // Redirect non-activated users accessing protected routes (except verification page)
        if (user && user.status !== "ACTIVATED" && !restrictedRoutesForLoggedIn.includes(currentPath)) {
            if (currentPath !== "/verification") {
                return NextResponse.redirect(new URL("/verification", request.url));
            }
        }

        // Redirect activated users away from the verification page
        if (user && user.status === "ACTIVATED" && currentPath === "/verification") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // Redirect authenticated users away from signin/signup pages
        // if (user && restrictedRoutesForLoggedIn.includes(currentPath)) {
        //     return NextResponse.redirect(new URL("/", request.url));
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

// Middleware configuration with route matchers
export const config = {
    matcher: ["/verification", "/profile", "/dashboard/:path*", "/profile/:path*", "/business/:path*"],
};
