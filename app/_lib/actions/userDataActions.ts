"use server";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../service/database";
import client from "../service/db";
// import client from "./db"

export async function getUser(username: string) {
    const db = await connectToDatabase();
    const cursor = db?.collection("users").findOne({ username });
    return cursor;
}
// type UserType = {
//     _id: string;
//     name: string;
//     username: string;
//     password: string;
//     daysCollection: string;
// };
export interface UserInterface {
   _id: ObjectId;
    name: string;
    username: string;
    password: string;
    daysCollection: string;
}

export interface UserInterface2 {
    name: string;
    password: string;
}
// interface test extends WithId<Document> {
//     _id: ObjectId;
//     name: string;
//     username: string;
//     password: string;
//     daysCollection: string;
// }

export async function getUserByName(name: string | null | undefined): Promise<UserInterface> {
    const db = await connectToDatabase();
    const cursor = await db?.collection("users").findOne<UserInterface>({ name });
    console.log("cursor:", cursor);
    if(cursor) return  cursor;
    else return new Promise((req,res) => {})
}
// Promise<UserType>
export async function getUserByUsernameVerSec(username: string | unknown):Promise<UserInterface2 | null> {
    await client.connect();
    const cursor = client.db("lockin").collection("users");
    const user = cursor.findOne<UserInterface2>({ username });
    if(user) return user;
    else return new Promise((req,res) => {})

    // try {
    //     const db = await connectToDatabase()
    //     const user = db?.collection("users").findOne({name})
    //     // const user = await db.user.findUnique({where: {username}})
    //     return user
    // }catch(err){
    //     console.log(err);
    // }
}
