import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const layout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }
    if (session.expires < new Date().toISOString()) {
        redirect("/login")
    }
    return (
        <div><div>protected</div>{children}</div>
    )
}

export default layout