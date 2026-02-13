"use client";
import { login } from "../_lib/actions/authActions";
// import { loginWithCredentials } from "../_lib/actions/dataActions";
import Button from "./Button";

const guestCredentials = new Map();
guestCredentials.set("username", "demo");
guestCredentials.set("password", "demo");

function Guest() {
    return (
        <div className="flex">
            <Button variation="form" onClick={() => login(guestCredentials)}>
                Continue as Demo
            </Button>
            {/* <button onClick={() => loginWithCredentials({username: "demo", password: "demo"})}>Continue to Demo</button> */}
        </div>
    );
}

export default Guest;
