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
            <div >
                {session && session?.user ? (
                    <div className='flex gap-2 items-center'>
                        <Link href={"/idea/create"}><span className='font-bold'>
                            create
                        </span>
                        </Link>
                        <ProfileMenu session={session} />
                    </div>
                ) : (
                    <Link href={'/login'}>Log In</Link>
                )
                }
            </div >
        </div >
    )
}

export default Navbar