"use server"

import { collection } from "@/app/db";
import { Document, MongoClient, WithId } from "mongodb";

type ActivityType = {
    name: string;
    inputMode: "input" | "select";
    target: string;
    input: string;
    unit: string;
    id: string;
    overUnder: string;
    width: number;
    actState: string;
    betterPriority?: string;
    comment?: string;
    // curStreak: number;
    // longestCompletedStreak: number;
    // longestUntouchedStreak: number;
};

type LoadedDataType = {
    date: Date;
    actsArray: ActivityType[];
    id: string;
    note: string;
    plan: string;
    rating: string;
    _id: string;
    betterPoints: number
};




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
    const data:WithId<Document>[] = []
    if(db) {
        const cursor = db.collection(collection).find().sort({date: 1})
        for await(const doc of cursor) {
            data.push(doc)
        }
        return data
    }
    return null
}

