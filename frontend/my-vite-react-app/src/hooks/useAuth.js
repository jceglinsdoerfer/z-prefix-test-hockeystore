import { useState, useEffect } from 'react';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8000/hockeystore/auth/check', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true);
                setUser(data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }
        catch (err) {
            console.error('Auth check error:', err);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8000/hockeystore/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUser(null);
                return true;
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
        return false;
    };
    useEffect(() => {
        checkAuth();
    }, []);
    return { isAuthenticated, user, loading, checkAuth, logout };
}
export default useAuth;