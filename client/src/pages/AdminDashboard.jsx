import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function AdminDashboard() {
    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0,
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await API.get("/admin/dashboard");

            setDashboard(response.data.data);
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

                    <h2>Admin Dashboard</h2>

                    <hr />

                    <div className="row">

                        <div className="col-md-4">
                            <div className="card text-bg-primary">
                                <div className="card-body text-center">
                                    <h5>Total Users</h5>
                                    <h2>{dashboard.totalUsers}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-success">
                                <div className="card-body text-center">
                                    <h5>Total Stores</h5>
                                    <h2>{dashboard.totalStores}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card text-bg-warning">
                                <div className="card-body text-center">
                                    <h5>Total Ratings</h5>
                                    <h2>{dashboard.totalRatings}</h2>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminDashboard;