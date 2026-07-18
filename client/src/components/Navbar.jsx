import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    const getDashboardLink = () => {
        if (!user) return "/";

        switch (user.role) {
            case "ADMIN":
                return "/admin/dashboard";

            case "USER":
                return "/user/dashboard";

            case "OWNER":
                return "/owner/dashboard";

            default:
                return "/";
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">

                <Link className="navbar-brand fw-bold" to={getDashboardLink()}>
                    Store Rating System
                </Link>

                <div className="d-flex align-items-center">

                    {user && (
                        <>
                            <span className="text-white me-3">
                                Welcome,
                                <strong> {user.name}</strong>
                            </span>

                            <span className="badge bg-primary me-3">
                                {user.role}
                            </span>

                            <Link
                                to="/change-password"
                                className="btn btn-warning btn-sm me-2"
                            >
                                Change Password
                            </Link>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;