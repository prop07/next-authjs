import { auth } from "@/auth";
import React from "react";

const page = async () => {
    const session = await auth();
    console.log("id_token", session.id_token)
    return <div>{JSON.stringify(session.user, null, 2)}</div>;
};

export default page;
