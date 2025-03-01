import { useState } from "react";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

export function AuthDisplay() {
    const [signUp, setSignUp] = useState(false)

    return (
        signUp ?
        <SignUp logInPressed={() => setSignUp(false)}/> :
        <Login signUpPressed={() => setSignUp(true)}/>
    )
}