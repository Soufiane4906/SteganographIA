import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ImageProvider } from './context/ImageContext';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Profile';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import Profile from './pages/Profile';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <UploadPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;