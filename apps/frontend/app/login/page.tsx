'use client'

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "http://localhost:3000/dashboard"
        })
    }

    return (
        <div>
            <button onClick={handleGoogleSignin}>
                Sign in with google
            </button>
        </div>
    )
}