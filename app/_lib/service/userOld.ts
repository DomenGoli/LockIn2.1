// import client from "./db"

// export async function getUserByUsernameVerSec(username: string) {
//     await client.connect()
//     const cursor = client.db("lockin").collection("users")
//     const user = cursor.findOne({username})
//     return user
    
//     // try {
//     //     const db = await connectToDatabase()
//     //     const user = db?.collection("users").findOne({name})
//     //     // const user = await db.user.findUnique({where: {username}})
//     //     return user
//     // }catch(err){
//     //     console.log(err);
//     // }
// } 