import { SignIn } from "@clerk/clerk-react";

export default function Login() {
    return <div className=" h-screen flex items-center justify-center">
        <SignIn path="/auth/sign-in" signUpUrl="/auth/sign-up" signUpFallbackRedirectUrl='/'/>
    </div>
}