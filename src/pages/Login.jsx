import React from "react";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const res = await loginUser(formData);
            const token = res.data.token;

            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed: " + err.response.data.message);
        }
    };

    return (
        <div className="form-container sign-in">
            <AuthForm isLogin={true} onSubmit={handleLogin} />  
        </div>
    );
};

export default Login;
