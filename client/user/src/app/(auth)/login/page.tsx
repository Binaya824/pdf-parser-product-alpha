import Login from '@/components/auth/login/Login'
import RedirectIfAuthenticated from '@/components/auth/RedirectIfAuthenticated'
import React from 'react'

const page = () => {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent" >
        <Login />
      </div>
    </RedirectIfAuthenticated>
  )
}

export default page