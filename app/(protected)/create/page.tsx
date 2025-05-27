import { auth } from '@/auth'
import React from 'react'

const page = async () => {
    const session = await auth()
    return (
        <div>{JSON.stringify(session, null, 2)}</div>
    )
}

export default page