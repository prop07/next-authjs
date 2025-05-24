'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import LogOut from './button/Log-out';

const ProfileMenu = ({ session }) => {
    const [open, setOpen] = useState(false);



    return (
        <div className="relative inline-block">
            <Image
                src={session?.user?.image || ''}
                alt='profile'
                width={40}
                height={40}
                className='rounded-full cursor-pointer'
                onClick={() => setOpen(prev => !prev)}
            />
            {open && (
                <div className="absolute border border-neutral-800 shadow-md mt-2 -left-10 rounded-md ">
                    <p className=' hover:bg-neutral-800 cursor-pointer px-4 py-1 '>{session?.user?.name}</p>
                    <div className=' hover:bg-neutral-800  px-4 py-1 '><LogOut /></div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
