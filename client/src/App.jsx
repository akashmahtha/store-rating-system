import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import CreateUser from "./pages/CreateUser";

import Stores from "./pages/Stores";
import StoreDetails from "./pages/StoreDetails";
import CreateStore from "./pages/CreateStore";

import UserDashboard from "./pages/UserDashboard";
import UserStores from "./pages/UserStores";

import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerStores from "./pages/OwnerStores";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />



      {/* Admin Routes */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <UserDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-user"
        element={
          <ProtectedRoute role="ADMIN">
            <CreateUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="ADMIN">
            <Stores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <StoreDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-store"
        element={
          <ProtectedRoute role="ADMIN">
            <CreateStore />
          </ProtectedRoute>
        }
      />



      {/* User Routes */}

      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/stores"
        element={
          <ProtectedRoute role="USER">
            <UserStores />
          </ProtectedRoute>
        }
      />



      {/* Owner Routes */}

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/store"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerStores />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />


      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;