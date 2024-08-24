"use client"
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../common/LoadingScreen';
import { useRouter } from 'next/navigation';
import {checkUserAuth} from '@/utils/userAuth';
import { toast } from 'sonner';

interface AuthCheckerProps {
    children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const performAuthCheck = async () => {
            const { isAuthenticated, isError, data } = await checkUserAuth();
            if (isError) {
                toast.error("Some error occurred",{
                    position:"top-right"
                });
            }

            if (isAuthenticated) {
                // Redirect to dashboard if the user is authenticated
                SetIsAuthenticated(true);
            } else {
                router.push("/login");
            }
        };
        performAuthCheck();
    }, [router]);

    if (!isAuthenticated) {
        return <LoadingScreen />;
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthChecker;