// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('authToken');
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('authToken');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    };

    if (!isAuthenticated()) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;