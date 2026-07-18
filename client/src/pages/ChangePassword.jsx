import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function ChangePassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await API.put("/auth/change-password", {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            alert(response.data.message);

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        <div className="card shadow">

                            <div className="card-header text-center">
                                <h3>Change Password</h3>
                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Old Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="oldPassword"
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        className="btn btn-primary w-100"
                                        type="submit"
                                    >
                                        Change Password
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;