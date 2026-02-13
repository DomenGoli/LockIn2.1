// // import { redirect } from "next/navigation";
// // import { signIn } from "../_lib/auth";
// import { loginWithCredentials, logout } from "../_lib/actions/dataActions";
// import Guest from "./Guest";
// import Button from "./Button";
// // import Link from "next/link";

// type FormType = { username: string; password: string };

// async function Login() {
//     // const [username, setUsername] = useState("");

//     return (
//         <div className="flex flex-col justify-center items-center">
//             <label className="text-8xl mb-5">LockIn</label>
//             <form action={loginWithCredentials}>
//                 <div className="flex flex-col gap-5">
//                     <div className="flex flex-col">
//                         <label className="text-center">Username</label>
//                         <input
//                             type="text"
//                             name="username"
//                             className="w-50 bg-amber-50 text-black text-center"
//                         ></input>
//                         <label className="text-center">Password</label>
//                         <input
//                             type="text"
//                             name="password"
//                             className="w-50 bg-amber-50 text-black text-center"
//                         ></input>
//                         {/* <input type="hidden" name="redirectTo" value="/dsfsfs" /> */}
//                     </div>

//                     <Button type="submit" variation="form">
//                         Login
//                     </Button>
//                     <div className="flex mt-12 justify-center"></div>
//                 </div>
//             </form>
//             <Guest />
//         </div>
//     );
// }

// export default Login;
