"use client"
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../common/LoadingScreen';
import { useRouter } from 'next/navigation';
import {checkUserAuth} from '@/utils/userAuth';
import { toast } from 'sonner';

interface RedirectIfAuthenticatedProps {
    children: React.ReactNode;
}

const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const performAuthCheck = async () => {
            const {isError, isAuthenticated, data} = await checkUserAuth();
            if (isError) {
                toast.error("Some error occurred",{
                    position:"top-right"
                });
            }
            if (isAuthenticated) {
                // Redirect to dashboard if the user is authenticated
                router.push("/app");
            } else {
                // User is not authenticated, allow access to login/register page
                setLoading(false);
            }
        };

        performAuthCheck();
    }, [router]);

    return loading ? <LoadingScreen /> : <>{children}</>;
};

export default RedirectIfAuthenticated;
