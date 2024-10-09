import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { LOGIN, REGISTER, REGISTER_VENDOR, PUBLIC_ROUTES, ROOT } from "./lib/routes";

// export default withAuth(
//     async function middleware(req) {
//         const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//         const role = token?.role;
//         const url = req.nextUrl.pathname;

//         // Define role-based denied access rules
//         const deniedPaths = {
//             ADMIN: ["/checkout"],
//             VENDOR: ["/dashboard/vendors", "/dashboard/categories","/checkout"],
//             USER: ["/dashboard/vendors", "/dashboard/customers", "/dashboard/sales", "/dashboard/categories", "/dashboard/products", "/dashboard/coupons", "/dashboard/vendor-support"]
//         };
    
//         // Determine if the user should be denied access to the requested page
//         const isDenied = (deniedPaths[role] || []).some(path => url.startsWith(path));
    
//         if (isDenied) {
//             // Redirect to a 'Not Authorized' or a default page
//             return NextResponse.redirect(new URL("/access-denied", req.url));
//         } else {
//             return NextResponse.next();
//         }
//     },
//     {
//         pages: {
//             signIn: "/login",
//         }
//     }
// );

export default async function middleware(req) {
    const { nextUrl } = req;
    const url = nextUrl.pathname;
    
    // Check if the route matches any of the public routes or the root
    const isPublicRoute = PUBLIC_ROUTES.some(route => url.startsWith(route)) || nextUrl.pathname === ROOT;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const role = token?.role;
    
    // If the user is not authenticated and the route is not public, redirect to login
    if (!role && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, req.url));
    }

    // Define role-based denied access rules
    const deniedPaths = {
        ADMIN: ["/checkout"],
        VENDOR: ["/dashboard/vendors", "/dashboard/categories", "/checkout"],
        USER: ["/dashboard/vendors", "/dashboard/customers", "/dashboard/sales", "/dashboard/categories", "/dashboard/products", "/dashboard/coupons", "/dashboard/vendor-support"]
    };

    // Determine if the user should be denied access to the requested page
    const isDenied = (deniedPaths[role] || []).some(path => url.startsWith(path));

    if (isDenied) {
        return NextResponse.redirect(new URL("/access-denied", req.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",  // Match dashboard routes
        "/checkout"  // Match checkout route
    ]
};

