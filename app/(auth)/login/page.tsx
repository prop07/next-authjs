import React from "react";
import GoogleSignIn from "@/components/ui/button/GoogleSignIn";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import SignOutOnError from "@/components/SignOutOnError";
import { auth } from "@/auth";


const page = async ({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>
}) => {
    const session = await auth();
    const params = await searchParams;
    const token = params?.token || null;
    let paramsObj;
    if (token) {
        paramsObj = JSON.parse(atob(token));
    }


    async function handleLogin(formData: FormData) {
        "use server";
        try {
            await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });
            console.log("Login successful login page");
        } catch (error) {
            let encoded;
            if (error instanceof AuthError) {
                if (error.message?.includes("CredentialsSignin")) {
                    const result = {
                        status: "error",
                        message: "Invalid credentials.",
                    };
                    encoded = btoa(JSON.stringify(result));
                    redirect("/login?token=" + encoded);
                } else {
                    const result = {
                        status: "error",
                        message: "An unexpected error occurred. Please try again later.",
                    };
                    encoded = btoa(JSON.stringify(result));
                    redirect("/login?token=" + encoded);
                }
            }
        }
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className=" fixed top-0 left-0 right-0  p-4 text-center">
                    {paramsObj && paramsObj.status === "error" && (
                        <div>
                            <SignOutOnError session={session} />
                            <div className="text-red-500">{paramsObj.message}</div>
                        </div>
                    )}
                </div>
                <form action={handleLogin} className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <input
                        className=" border border-gray-600 p-2 rounded-md"
                        type="text"
                        name="email"
                        placeholder="email"
                    />
                    <input
                        className=" border border-gray-600 p-2 rounded-md"
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <button
                        className=" bg-white text-black rounded-md cursor-pointer"
                        type="submit"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-gray-500">or</p>
                <GoogleSignIn />
            </div>
        </div>
    );
};

export default page;
