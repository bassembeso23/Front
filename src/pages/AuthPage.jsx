import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { loginUser, registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import { useToast } from '../hooks/use-toast';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { toastSuccess, toastError } = useToast();

    const { execute: executeLogin, loading: loginLoading, error: loginError } = useAsync(loginUser);
    const { execute: executeRegister, loading: registerLoading, error: registerError } = useAsync(registerUser);

    const handleSubmit = async (formData) => {
        try {
            if (isLogin) {
                const res = await executeLogin(formData);
                const token = res.data.token;
                localStorage.setItem('token', token);
                navigate('/dashboard');
            } else {
                await executeRegister(formData);
                toastSuccess({
                    title: "Registration Successful",
                    description: "Please login with your credentials.",
                });
                setIsLogin(true);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            toastError({
                title: isLogin ? "Login Failed" : "Registration Failed",
                description: errorMessage,
            });
            console.error('Auth error:', err);
        }
    };

    return (
        <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            onToggle={() => setIsLogin(!isLogin)}
            isLoading={isLogin ? loginLoading : registerLoading}
            error={isLogin ? loginError?.response?.data?.message : registerError?.response?.data?.message}
        />
    );
};

export default AuthPage;
