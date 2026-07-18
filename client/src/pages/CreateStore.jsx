import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function CreateStore() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: "",
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
            await API.post("/admin/stores", formData);

            alert("Store Created Successfully");

            navigate("/admin/stores");
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

                    <h2>Create Store</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label>Store Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Store Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
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
                            <label>Owner ID</label>
                            <input
                                type="number"
                                className="form-control"
                                name="owner_id"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-success">
                            Create Store
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default CreateStore;