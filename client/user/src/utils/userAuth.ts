import Cookies from 'js-cookie';
import createAxiosInstance from './createAxiosInstance';

export interface AuthCheckData {
    isAuthenticated: boolean;
    isError: boolean;
    data: any;
}

// Function to check user authentication
export const checkUserAuth = async (): Promise<AuthCheckData> => {
    const token = Cookies.get('authToken');
    const axiosInstance = createAxiosInstance();

    if (!token) {
        return {
            isAuthenticated: false,
            isError: false,
            data: null,
        };
    }

    try {
        // Call your API and retrieve information here
        const response = await axiosInstance.get('/api/core/user/profile'); // Example API call
        return {
            isAuthenticated: true,
            isError: false,
            data: response.data, // Replace with the actual data structure
        };
    } catch (error) {
        console.log('Error occurred while checking user authentication:', error);
        return {
            isAuthenticated: false,
            isError: true,
            data: null,
        };
    }
};

// Function to log out the user
export const logout = (): void => {
    Cookies.remove('authToken'); // Clear the authentication token
    // You can also clear other related cookies if needed
    console.log('User logged out and auth token cleared.');
};
