import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import API from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/login", formData);

            // localStorage.setItem("token", response.data.token);
            // localStorage.setItem("user", JSON.stringify(response.data.user));

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            toast.success(response.data.message);

            const role = response.data.user.role;

            setTimeout(() => {
                if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (role === "OWNER") {
                    navigate("/owner/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <ToastContainer />

            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;