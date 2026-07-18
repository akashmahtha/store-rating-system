import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("name");
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        fetchUsers();
    }, [sortBy, order]);

    const fetchUsers = async () => {
        try {
            const response = await API.get(
                `/admin/users?sortBy=${sortBy}&order=${order}`
            );

            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const searchUsers = async () => {
        try {
            if (search.trim() === "") {
                fetchUsers();
                return;
            }

            const response = await API.get(
                `/admin/users/search?search=${search}`
            );

            setUsers(response.data.data);
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

                    <div className="d-flex justify-content-between mb-3">
                        <h2>Users</h2>

                        <Link
                            to="/admin/create-user"
                            className="btn btn-primary"
                        >
                            Add User
                        </Link>
                    </div>

                    <div className="row mb-3">

                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search User..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-2">
                            <button
                                className="btn btn-success w-100"
                                onClick={searchUsers}
                            >
                                Search
                            </button>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="name">Sort By Name</option>
                                <option value="email">Sort By Email</option>
                                <option value="address">Sort By Address</option>
                                <option value="role">Sort By Role</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                            >
                                <option value="ASC">Ascending</option>
                                <option value="DESC">Descending</option>
                            </select>
                        </div>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.role}</td>

                                    <td>
                                        <Link
                                            to={`/admin/users/${user.id}`}
                                            className="btn btn-info btn-sm"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>
            </div>
        </>
    );
}

export default Users;