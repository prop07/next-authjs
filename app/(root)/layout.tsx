import Navbar from "@/components/Navbar";

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="p-2 space-y-2">
            <Navbar />
            {children}
        </main>
    );
}