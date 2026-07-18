import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: "250px",
                minHeight: "100vh",
            }}
        >
            <h4 className="text-center mb-4">Admin Panel</h4>

            <div className="list-group">

                <Link
                    to="/admin/dashboard"
                    className="list-group-item list-group-item-action"
                >
                    Dashboard
                </Link>

                <Link
                    to="/admin/users"
                    className="list-group-item list-group-item-action"
                >
                    Users
                </Link>

                <Link
                    to="/admin/stores"
                    className="list-group-item list-group-item-action"
                >
                    Stores
                </Link>

                <Link
                    to="/admin/create-user"
                    className="list-group-item list-group-item-action"
                >
                    Create User
                </Link>

                <Link
                    to="/admin/create-store"
                    className="list-group-item list-group-item-action"
                >
                    Create Store
                </Link>

            </div>
        </div>
    );
}

export default Sidebar;