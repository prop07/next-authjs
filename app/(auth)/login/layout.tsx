import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';


const layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (session && session?.user) {
        redirect('/')
    }
    return children
}

export default layout