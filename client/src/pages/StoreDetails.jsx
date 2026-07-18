import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function StoreDetails() {
    const { id } = useParams();

    const [store, setStore] = useState({});

    useEffect(() => {
        fetchStore();
    }, []);

    const fetchStore = async () => {
        try {
            const response = await API.get(`/admin/stores/${id}`);
            setStore(response.data.data);
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
                        <h2>Store Details</h2>

                        <Link
                            to="/admin/stores"
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
                                        <td>{store.id}</td>
                                    </tr>

                                    <tr>
                                        <th>Store Name</th>
                                        <td>{store.name}</td>
                                    </tr>

                                    <tr>
                                        <th>Email</th>
                                        <td>{store.email}</td>
                                    </tr>

                                    <tr>
                                        <th>Address</th>
                                        <td>{store.address}</td>
                                    </tr>

                                    <tr>
                                        <th>Owner</th>
                                        <td>{store.ownerName}</td>
                                    </tr>

                                    <tr>
                                        <th>Average Rating</th>
                                        <td>{store.averageRating || "No Rating"}</td>
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

export default StoreDetails;