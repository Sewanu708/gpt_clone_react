import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
    return <div className="h-screen flex items-center justify-center">
        <SignUp path="/auth/sign-up" signInUrl="/auth/sign-in" signInFallbackRedirectUrl='/'/>
    </div>
}