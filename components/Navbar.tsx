import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'
import ProfileMenu from './ui/ProfileMenu'


const Navbar = async () => {
    const session = await auth()
    return (
        <div className='flex justify-between'>
            <div>
                <Link href="/" className=' text-2xl font-bold'>Logo</Link>
            </div>
            <div className='flex items-center gap-2' >
                <Link href={"/dashboard"}><span className='font-bold hover:text-blue-500 hover:underline'>
                    DashBoard
                </span>
                </Link>
                {session && session?.user ? (
                    <div className='flex gap-2 items-center'>
                        <ProfileMenu session={session} />
                    </div>
                ) : (
                    <div>
                        <Link href={'/login'}>Log In</Link>
                    </div>
                )
                }
            </div >
        </div >
    )
}

export default Navbar