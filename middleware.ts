// import {authConfig} from "./authConfig";
import NextAuth from "next-auth";
import {
    apiAuthPrefix,
    // publicRoutes,
    // authRoutes,
} from "@/routes";
import { authConfig } from "./app/_lib/auth.config";

const { auth } = NextAuth(authConfig);

// export default auth(authCallback)
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    // const isLoggedIn = false;
    console.log("ROUTE:", req.nextUrl.pathname);
    console.log("IS LOGGED IN:", isLoggedIn);

    const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // if(nextUrl.pathname === "/") {
    //     return Response.redirect(new URL("/auth/login", nextUrl));
    // }

    if (isApiAuthPrefix) {
        return null;
    }

    if (!isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    // if (isAuthRoute) {
    //     if (isLoggedIn)
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     return null;
    // }

    return null;
});







export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // "/"
    ], // karkoli je v tej routi, bo invokal middleware (auth fukcijo v tem primeru)
};
// export const { auth: middleware } = NextAuth(authConfig);
