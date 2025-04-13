import { createContext, useEffect, useState } from 'react';
import { User, UserCredential } from 'firebase/auth';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email!, password!)
}

function signOut() {
    return auth.signOut();
}

function signUp(email: string, password: string, displayName: string): any {
    return createUserWithEmailAndPassword(auth, email!, password!)
        .then((userCredential) => {
            return updateProfile(userCredential.user, { displayName: displayName })
        })
}

type AuthContextProps = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string, displayName: string) => any;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    signIn: signIn,
    signOut: signOut,
    signUp: signUp,
})

type AuthProviderProps = {
    children:
        | React.ReactElement
        | React.ReactElement[]
        | JSX.Element
        | JSX.Element[]
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user)
            setLoading(false)
        })
    
    }, [])

    const value = {
        user,
        loading,
        signIn,
        signOut,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}