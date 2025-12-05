import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../lib/auth'; // Assuming you have an auth utility for handling authentication

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const user = await auth.signInWithEmailAndPassword(email, password);
        setUser(user);
        router.push('/');
    };

    const signup = async (email, password) => {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        setUser(user);
        router.push('/');
    };

    const logout = async () => {
        await auth.signOut();
        setUser(null);
        router.push('/login');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};