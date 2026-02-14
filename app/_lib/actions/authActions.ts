"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn, signOut } from "../auth";

export async function login(credentials: FormData | Map<string, string>) {
    const username = credentials.get("username");
    const password = credentials.get("password");
    console.log("login triggered",username, password);

    await signIn("credentials", {
        username,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
}

export async function logout() {
    await signOut({ redirectTo: "/auth/login", redirect: true });
}

// export async function loginWithCredentials(credentials: {username:string, password:string}) {
//     await signIn("credentials", credentials );

// }
