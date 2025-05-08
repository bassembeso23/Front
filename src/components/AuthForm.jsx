import React, { useState, useEffect } from "react";
import { FaGooglePlusG, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const AuthForm = ({ isLogin, onSubmit, onToggle, isLoading, error }) => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setForm({ name: "", email: "", password: "" });
        setFormErrors({});
        setTouched({});
    }, [isLogin]);

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (!form.password) {
            errors.password = "Password is required";
        } else if (form.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (!isLogin) {
            if (!form.name) {
                errors.name = "Name is required";
            } else if (form.name.length < 2) {
                errors.name = "Name must be at least 2 characters";
            }
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));

        // Validate field on change if it's been touched
        if (touched[name]) {
            const errors = validateForm();
            setFormErrors(prev => ({ ...prev, [name]: errors[name] }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const errors = validateForm();
        setFormErrors(prev => ({ ...prev, [name]: errors[name] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const payload = isLogin ? { email: form.email, password: form.password } : form;
            onSubmit(payload);
        }
    };

    return (
        <div className="auth-form-container min-h-screen bg-gradient-to-r from-semiLight to-light flex items-center justify-center p-1">
            <div className={`container ${isLogin ? "" : "active"}`} id="container">
                <form onSubmit={handleSubmit} noValidate>
                    <h1>{isLogin ? "Sign In" : "Create Account"}</h1>
                    <div className="social-icons">
                        <a href="#" className="icon">
                            <FaGooglePlusG />
                        </a>
                        <a href="#" className="icon">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="icon">
                            <FaLinkedinIn />
                        </a>
                    </div>
                    <span>
                        {isLogin
                            ? "Use your email and password"
                            : "or use your email for registration"}
                    </span>

                    {!isLogin && (
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={form.name}
                                className={formErrors.name ? "error" : ""}
                                disabled={isLoading}
                            />
                            {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                        </div>
                    )}
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.email}
                            className={formErrors.email ? "error" : ""}
                            disabled={isLoading}
                        />
                        {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.password}
                            className={formErrors.password ? "error" : ""}
                            disabled={isLoading}
                        />
                        {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button
                        type="submit"
                        className="form-btn"
                        disabled={isLoading || Object.keys(formErrors).length > 0}
                    >
                        {isLoading ? "Processing..." : (isLogin ? "SIGN IN" : "SIGN UP")}
                    </button>
                </form>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className={`toggle-panel ${isLogin ? "toggle-right" : "toggle-left"}`}>
                            <h1>{isLogin ? "Hello, User!" : "Welcome Back!"}</h1>
                            <p>
                                {isLogin
                                    ? "Register to use all site features"
                                    : "Login to access your account"}
                            </p>
                            <button
                                className="form-btn toggle-btn"
                                onClick={onToggle}
                                disabled={isLoading}
                            >
                                {isLogin ? "SIGN UP" : "SIGN IN"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
