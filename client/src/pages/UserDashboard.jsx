import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function UserDashboard() {
    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2>User Dashboard</h2>

                <hr />

                <Link
                    to="/user/stores"
                    className="btn btn-primary"
                >
                    View Stores
                </Link>

            </div>
        </>
    );
}

export default UserDashboard;