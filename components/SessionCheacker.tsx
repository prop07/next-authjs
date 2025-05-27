// components/SessionChecker.tsx
"use client"
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function SessionChecker({ session }) {

    useEffect(() => {
        if (session?.expires && new Date(session.expires) < new Date()) {
            const result = {
                status: "error",
                message: "Session expired. Login again.",
            }
            const encoded = btoa(JSON.stringify(result));
            signOut()
        }
    }, [session])

    return null
}