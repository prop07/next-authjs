'use client'
import React, { useEffect } from 'react'
import { hello } from './fun'

const Page = () => {
    const [greet, setGreet] = React.useState('')
    useEffect(() => {
        const hello2 = async () => {
            const greet = await hello("morning")
            setGreet(greet)
        }
        hello2()
    }, [greet])

    return (
        <div>
            {greet}
        </div>
    )
}

export default Page