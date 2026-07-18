import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function CreateUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
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
            await API.post("/admin/users", formData);

            alert("User Created Successfully");

            navigate("/admin/users");
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div className="container p-4">

                    <h2>Create User</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
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
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label>Role</label>

                            <select
                                className="form-select"
                                name="role"
                                onChange={handleChange}
                            >
                                <option value="USER">USER</option>
                                <option value="OWNER">OWNER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>

                        <button className="btn btn-success">
                            Create User
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default CreateUser;