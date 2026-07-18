import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Stores() {
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const response = await API.get("/admin/stores");
            setStores(response.data.data);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch stores");
        }
    };

    const searchStores = async () => {
        try {
            if (search.trim() === "") {
                fetchStores();
                return;
            }

            const response = await API.get(
                `/admin/stores/search?search=${search}`
            );

            setStores(response.data.data);
        } catch (error) {
            console.log(error);
            alert("Search failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="d-flex">
                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Stores</h2>

                        <Link
                            to="/admin/create-store"
                            className="btn btn-success"
                        >
                            Add Store
                        </Link>
                    </div>

                    <div className="row mb-3">

                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Store..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <button
                                className="btn btn-primary w-100"
                                onClick={searchStores}
                            >
                                Search
                            </button>
                        </div>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Store Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Owner</th>
                                <th>Average Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {stores.length > 0 ? (
                                stores.map((store) => (
                                    <tr key={store.id}>
                                        <td>{store.id}</td>
                                        <td>{store.name}</td>
                                        <td>{store.email}</td>
                                        <td>{store.address}</td>
                                        <td>{store.ownerName}</td>
                                        <td>{store.averageRating || "No Rating"}</td>

                                        <td>
                                            <Link
                                                to={`/admin/stores/${store.id}`}
                                                className="btn btn-info btn-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No Stores Found
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}

export default Stores;