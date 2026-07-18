import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function OwnerDashboard() {
    return (
        <>
            <Navbar />

            <div className="container mt-5">

                <h2>Store Owner Dashboard</h2>

                <hr />

                <Link
                    to="/owner/store"
                    className="btn btn-primary"
                >
                    View My Store
                </Link>

            </div>
        </>
    );
}

export default OwnerDashboard;