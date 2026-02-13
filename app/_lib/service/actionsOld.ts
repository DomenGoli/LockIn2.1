// "use server";
// import { ObjectId, WithId, Document } from "mongodb";
// import { connectToDatabase } from "./database";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { signIn, signOut } from "../auth";

// export async function saveDayToDatabaseAction(collection:string, day:object) {
//     const db = await connectToDatabase();
//     db?.collection(collection).insertOne(day);

//     revalidatePath("/");
//     redirect("/");
// }

// export async function saveMultipleDaysToDatabaseAction(collection:string, days: object[]) {
//     const db = await connectToDatabase();
//     db?.collection(collection).insertMany(days);

//     revalidatePath("/");
//     redirect("/");
// }

// export async function deleteDayFromDatabase(collection:string, id: string) {
//     const objectId = new ObjectId(id);
//     const db = await connectToDatabase();
//     db?.collection(collection).deleteOne({ _id: objectId });

//     revalidatePath("/");
//     redirect("/");
// }

// export async function getSavedDaysData(collection: string) {
//     // For testing db data long loading time
//     // await new Promise((res) => setTimeout(res, 5000));

//     const db = await connectToDatabase();
//     const data: WithId<Document>[] = [];
//     if (db) {
//         const cursor = db.collection(collection).find().sort({ date: 1 });
//         for await (const doc of cursor) {
//             data.push(doc);
//         }
//         return data;
//     }
//     return null;
// }
// //// zamenja jo actions/authActions.ts // deprecated
// export async function loginWithCredentials(credentials: {username:string, password:string}) {
//     // await signOut()
//     await signIn("credentials", credentials );
    
// }

// // premaknjen v 
// export async function logout(){
//     await signOut({redirectTo: "/auth/login", redirect: true})
//     // redirect("/auth/login")
// }

// export async function getUser(username: string) {
//     const db = await connectToDatabase();
//     const cursor = db?.collection("users").findOne({ username });
//     return cursor;
// }


// export async function getUserByName(name: string) {
//     const db = await connectToDatabase();
//     const cursor = db?.collection("users").findOne({ name });
//     return cursor;
// }
