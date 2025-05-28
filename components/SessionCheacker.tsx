// components/SessionChecker.tsx
"use client"
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'

export default function SessionChecker({ session }: { session: Session | null }) {
    useEffect(() => {
        if (session?.expires && new Date(session.expires) < new Date()) {
            signOut()
        }
        if (session?.expires && new Date(session.expires) > new Date()) {
            redirect("/")
        }
    }, [session])

    return null
}