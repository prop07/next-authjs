import { signIn } from "@/auth"
import { FaGoogle } from "react-icons/fa";

export default function GoogleSignIn() {

    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <h1></h1>
            <button type="submit"><span className=" flex items-center gap-2 border-1 border-neutral-800 rounded-md p-2 cursor-pointer hover:bg-neutral-800 "><FaGoogle />Login with Google</span></button>
        </form>
    )
} 