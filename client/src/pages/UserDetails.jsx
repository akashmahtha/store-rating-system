import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function UserDetails() {
    const { id } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await API.get(`/admin/users/${id}`);
            setUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">
                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between mb-4">
                        <h2>User Details</h2>

                        <Link
                            to="/admin/users"
                            className="btn btn-secondary"
                        >
                            Back
                        </Link>
                    </div>

                    <div className="card shadow">

                        <div className="card-body">

                            <table className="table">

                                <tbody>

                                    <tr>
                                        <th width="200">ID</th>
                                        <td>{user.id}</td>
                                    </tr>

                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>

                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>

                                    <tr>
                                        <th>Address</th>
                                        <td>{user.address}</td>
                                    </tr>

                                    <tr>
                                        <th>Role</th>
                                        <td>{user.role}</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default UserDetails;