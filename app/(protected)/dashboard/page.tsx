import { auth } from "@/auth";
import React from "react";

const page = async () => {
    const session = await auth();
    if (session) {
        console.log("id_token", session.id_token);
    } else {
        console.log("Session is null");
    }
    return <div>{session ? JSON.stringify(session.user, null, 2) : "No user session available"}</div>;
};

export default page;
