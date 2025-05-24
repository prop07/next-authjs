
import React from 'react'
import GoogleSignIn from '@/components/ui/button/GoogleSignIn'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { signIn } from "@/auth"
import { AuthError } from 'next-auth'
import Link from 'next/link'


const page = async () => {
    const session = await auth()
    if (session) {
        redirect('/')
    }
    async function handleLogin(formData: FormData) {
        "use server"
        try {

            const res = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });
            console.log("response:" + res)
        }
        catch (error) {
            if (error instanceof AuthError) {
                if (error.type === "CredentialsSignin") {
                    console.log("Invalid credentials")
                }
                else {
                    console.log("Please try again later")
                }
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                <span><Link href={"/"}>home</Link></span>
                <form
                    action={handleLogin}
                    className="flex flex-col gap-2">
                    <input type="text" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />
                    <button type="submit">Log In</button>
                </form>
                <GoogleSignIn />
            </div>
        </div>
    )
}

export default page




