import { auth } from "@/auth";
import SessionChecker from "@/components/SessionCheacker";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    return (
        <div>
            {" "}
            <SessionChecker session={session} /> {children}
        </div>
    );
};

export default layout;
