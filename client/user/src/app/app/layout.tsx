import AuthChecker from '@/components/auth/AuthChecker'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AuthChecker>
                {children}
            </AuthChecker>
        </div>
    )
}

export default layout