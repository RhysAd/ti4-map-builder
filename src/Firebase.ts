import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB6mQcV6SFJ0VL7_O05f6R16GQKSumYsdo",
    authDomain: "ti4-map-builder.firebaseapp.com",
    projectId: "ti4-map-builder",
    storageBucket: "ti4-map-builder.firebasestorage.app",
    messagingSenderId: "552744623175",
    appId: "1:552744623175:web:d7cb43582cb7171d112562",
    measurementId: "G-W6XMJGF9DC"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
connectAuthEmulator(auth, "http://127.0.0.1:9099")
//const analytics = getAnalytics(app)