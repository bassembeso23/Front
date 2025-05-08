import React from 'react';
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            await registerUser(formData);
            alert('Registered successfully. You can now log in.');
            navigate('/auth');
        } catch (err) {
            alert('Registration failed: ' + err.response.data.message);
        }
    };

    return (
        <div className="form-container sign-up">
            <AuthForm isLogin={false} onSubmit={handleRegister} />
        </div>
    );
};

export default Register;