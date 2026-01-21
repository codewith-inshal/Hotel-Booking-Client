import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, BrowserRouter, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import Rooms from './pages/Rooms';
import BookRoom from './pages/BookRoom';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';

import StaffDashboard from './pages/StaffDashboard';
import StaffLogin from './pages/StaffLogin';
import StaffRegister from './pages/StaffRegister';

import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

import AddRoom from './pages/AddRoom';
import EditRoom from './pages/EditRoom';

import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';

import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

function ProtectedRoute({ children, redirectTo }) {
  const user = localStorage.getItem('user');
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}

function StaffProtectedRoute({ children, redirectTo }) {
  const staff = localStorage.getItem('staff');
  const location = useLocation();
  return staff ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}

function AdminProtectedRoute({ children, redirectTo }) {
  const admin = localStorage.getItem('admin');
  const location = useLocation();
  return admin ? (
    children
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Homepage />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />

        {/* USER AUTH */}
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* USER PROTECTED */}
        <Route
          path="/book-room/:id"
          element={
            <ProtectedRoute redirectTo="/user-login">
              <BookRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute redirectTo="/user-login">
              <Bookings />
            </ProtectedRoute>
          }
        />

        {/* STAFF */}
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-register" element={<StaffRegister />} />
        <Route
          path="/staff-dashboard"
          element={
            <StaffProtectedRoute redirectTo="/staff-login">
              <StaffDashboard />
            </StaffProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute redirectTo="/admin-login">
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN ROOM CONTROL */}
        <Route
          path="/add-room"
          element={
            <AdminProtectedRoute redirectTo="/admin-login">
              <AddRoom />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/edit-room/:id"
          element={
            <AdminProtectedRoute redirectTo="/admin-login">
              <EditRoom />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
