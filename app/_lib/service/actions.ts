"use server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { collection } from "@/app/db";

export async function saveDayToDatabaseAction(day: object) {
    const db = await connectToDatabase();
    db?.collection(collection).insertOne(day);

    revalidatePath("/");
    redirect("/");
}

export async function deleteDayFromDatabase(id: string) {
    const objectId = new ObjectId(id);
    const db = await connectToDatabase();
    db?.collection(collection).deleteOne({ _id: objectId });

    revalidatePath("/");
    redirect("/");
}
