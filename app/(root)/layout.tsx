import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    return (
        <main className="p-2 space-y-2">
            <Navbar />
            {children}
        </main>
    );
}