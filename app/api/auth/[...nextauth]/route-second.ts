// import {handlers, signIn} from "@/app/_lib/auth"
// import { connectMongoDB } from "@/app/_lib/service/mongoDB";
// import User from "@/models/user";
// import { connect } from "http2";
// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"


// const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},
            
//             async authorize(credentials) {
//                 const {username, password} = credentials;
//                 try{
//                     await connectMongoDB();
//                     const user = await User.findOne({username})

//                     if(!user)  return null;
//                     if(password !== user.password) return null;

//                     return user
//                 }catch(error){
//                     console.log(error);
//                 }

//             }
//         })
//     ],
//     session: {
//         strategy: "jwt"
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/"
//     }
// }


// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST}