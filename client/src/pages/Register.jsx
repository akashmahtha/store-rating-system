import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import API from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
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
            const response = await API.post("/auth/register", formData);

            toast.success(response.data.message);

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <ToastContainer />

            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Address</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button className="btn btn-success w-100">
                        Register
                    </button>

                </form>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;