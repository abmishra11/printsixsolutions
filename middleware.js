// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { LOGIN, REGISTER, REGISTER_VENDOR, PUBLIC_ROUTES, ROOT } from "./lib/routes";

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

// export default withAuth(
//     async function middleware(req) {
//       const { nextUrl } = req;
//       const url = nextUrl.pathname;
      
//       const isPublicRoute = PUBLIC_ROUTES.some(route => url.startsWith(route)) || nextUrl.pathname === ROOT;
      
//       const token = req.nextauth.token;
//       const role = token?.role;
  
//       // Redirect to login if not authenticated and not on a public route
//       if (!role && !isPublicRoute) {
//         return NextResponse.redirect(new URL(LOGIN, req.url));
//       }
  
//       const deniedPaths = {
//         ADMIN: ["/checkout"],
//         VENDOR: ["/dashboard/vendors", "/dashboard/categories", "/checkout"],
//         USER: ["/dashboard/vendors", "/dashboard/customers", "/dashboard/sales", "/dashboard/categories", "/dashboard/products", "/dashboard/coupons", "/dashboard/vendor-support"]
//       };
  
//       const isDenied = (deniedPaths[role] || []).some(path => url.startsWith(path));
  
//       if (isDenied) {
//         return NextResponse.redirect(new URL("/access-denied", req.url));
//       }
  
//       return NextResponse.next();
//     },
//     {
//       callbacks: {
//         authorized: ({ token }) => !!token,
//       },
//     }
//   );
  
//   export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/dashboard/:path*", "/checkout"]
//   };

