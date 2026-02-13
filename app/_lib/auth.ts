import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./service/db";
import { authConfig } from "./auth.config";
import { getUserByUsernameVerSec } from "./actions/userDataActions";
// import { getUserByUsernameVerSec } from "./service/user";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: MongoDBAdapter(client),
    session: {strategy: "jwt"},
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async(credentials): Promise<any> =>{
                const username: string | unknown = credentials.username
                const user = await getUserByUsernameVerSec(username)

                if(!user || !user.password) return null

                if(credentials.password===user.password) return user
            }
        })
    ],
    // pages: {
    //     signIn: "auth/login"
    // }
})

// {username:string, password:string} | undefined









































/////PRVA
// export const { auth, handlers, signIn, signOut } = NextAuth({
//     // adapter: MongoDBAdapter(client),
//     providers: [
//         Credentials({
//             credentials: {
//                 username: {},
//                 password: {},
//             },
//             authorize: async (credentials) => {
//                 const {username, password} = credentials
//                 try {
//                     // await connectMongoDB()
//                     // const user = await User.collection("user").findOne({username});
//                     const user = await getUser(username)

//                     if(!user) return null;
//                     if(password !== user.password) return null

//                     return user;
//                 }catch(error){
//                     console.log(error);

//                 }

//                 // if (
//                 //     credentials?.username === user.username &&
//                 //     credentials.password === user.password
//                 // ) {
                
//             },
//         }),
//     ],
//     pages: {
//         signIn: "/login",
//     },
//     callbacks: {
//         authorized: async ({ auth }) => {
//             // Logged in users are authenticated, otherwiise redirect to login page
//             return !!auth;
//         },
//     },
//     session: {
//         strategy: "jwt"
//     }
// });
