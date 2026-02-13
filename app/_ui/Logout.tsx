import { auth } from "../_lib/auth";
// import { logout } from "../_lib/service/actions copy";
import { logout } from "@/app/_lib/actions/authActions";
import Button from "./Button";
import { getUserByName } from "../_lib/actions/userDataActions";

async function Logout() {
    const session = await auth();
    console.log("sesionnnn",session);
    const { name } = await getUserByName(session?.user?.name)
    

    return (
        <div>
            {session?.user && (
                <div>
                    <form action={logout}>
                        <div className="flex gap-3 items-center justify-center bg-(--day) h-10">
                            <Button type="submit">Logout</Button>
                            <p>{name}</p>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Logout;
