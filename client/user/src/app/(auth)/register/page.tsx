import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import Register from '@/components/auth/registration/Register'
import Image from 'next/image'
import React from 'react'

const page = () => {

    return (
        <RedirectIfAuthenticated>
            <div className="min-h-screen relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent" >
                <Register />
            </div>
        </RedirectIfAuthenticated>
    )
}

export default page