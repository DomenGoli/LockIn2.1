// import {authConfig} from "./authConfig";
import NextAuth from "next-auth";
import { authConfig } from "./app/_lib/auth.config";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

async function authMiddleware(req: NextRequest) {
    const {nextUrl} = req
    const isApiAuthPrefix = nextUrl.pathname.startsWith("/auth/login");
    const session = await auth()

    if(isApiAuthPrefix) return null;

    if(nextUrl.pathname === "/" && !session) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
}

export function middleware(request: NextRequest) {
    return authMiddleware(request)
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // "/"
    ], // karkoli je v tej routi, bo invokal middleware (auth fukcijo v tem primeru)
};