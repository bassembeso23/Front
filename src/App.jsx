import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import CloudSelect from './pages/CloudSelect';
import { ToastProvider, ToastViewport } from './components/ui/toast';

function App() {

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<AuthPage />} />
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/selectcloud" element={<CloudSelect />} />

          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
        <ToastViewport />
      </Router>
    </ToastProvider>
  );
}

export default App;
