"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

import { Session } from "next-auth";

export default function SignOutOnError({ session }: { session: Session | null }) {

    useEffect(() => {
        if (session) {
            signOut();
        }
    }, []);

    return null;
}
