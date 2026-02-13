"use server";

import { connectToDatabase } from "../service/database";
import client from "../service/db";
// import client from "./db"

export async function getUser(username: string) {
    const db = await connectToDatabase();
    const cursor = db?.collection("users").findOne({ username });
    return cursor;
}
type UserType = {
    _id: string;
    name: string;
    username: string;
    password: string;
    daysCollection: string;
};
export async function getUserByName(name: string | null | undefined): Promise<UserType> {
    const db = await connectToDatabase();
    const cursor = db?.collection("users").findOne({ name });
    return cursor;
}

export async function getUserByUsernameVerSec(username: string | unknown) {
    await client.connect();
    const cursor = client.db("lockin").collection("users");
    const user = cursor.findOne({ username });
    return user;

    // try {
    //     const db = await connectToDatabase()
    //     const user = db?.collection("users").findOne({name})
    //     // const user = await db.user.findUnique({where: {username}})
    //     return user
    // }catch(err){
    //     console.log(err);
    // }
}
