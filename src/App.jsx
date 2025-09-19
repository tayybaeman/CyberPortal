import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard/dashboardPage';
import ReportPage from './pages/Dashboard/ReportPage';
import HWForm from './pages/Dashboard/HWFormPage';
import CSForm from './pages/Dashboard/CSFormPage';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/hwform"
          element={
            <ProtectedRoute>
              <HWForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/csform"
          element={
            <ProtectedRoute>
              <CSForm />
            </ProtectedRoute>
          }
        />
        {/* Make path lowercase and consistent */}
        <Route
          path="/dashboard/ReportPage"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />

        {/* Optional catch-all */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
