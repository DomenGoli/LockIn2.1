// import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

// // type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware


// export function chain(functions, index=0) {
//     const current = functions[index]

//     if(current){
//         const next = chain(functions, index+1)
//         return current(next)
//     }

//     // return () => NextResponse.next()
//     return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {return response}
// }