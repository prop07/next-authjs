import { auth } from '@/auth'
import SessionChecker from '@/components/SessionCheacker';
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
    return (
        <div>
            <SessionChecker session={session} />
            <div>protected</div>{children}</div>
    )
}

export default layout