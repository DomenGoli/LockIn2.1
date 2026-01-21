"use server"

import { collection } from "@/app/db";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URL)

export async function connectToDatabase(){
    try {
        await client.connect()
        return client.db("lockin")
    }catch(err){
        console.log(err);
}}


export async function getSavedDaysData() {
    // For testing db data long loading time
    // await new Promise((res) => setTimeout(res, 5000));

    const db = await connectToDatabase()
    const data = []
    if(db) {
        const cursor = db.collection(collection).find().sort({date: 1})
        for await(const doc of cursor) {
            data.push(doc)
        }
        return data
    }
    return null
}

