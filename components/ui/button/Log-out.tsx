import { signOut } from 'next-auth/react';

const LogOut = () => {
    return (
        <form action={async () => {
            await signOut();
        }}><button className=' cursor-pointer' type='submit'>logout</button></form>
    )
}

export default LogOut