import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function OwnerStores() {
    const [store, setStore] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await API.get("/owner/dashboard");
            setStore(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!store) {
        return (
            <>
                <Navbar />
                <div className="container mt-5">
                    <h4>Loading...</h4>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>My Store</h2>

                <div className="card mt-3">
                    <div className="card-body">

                        <h4>{store.store.name}</h4>

                        <p>
                            <strong>Email:</strong> {store.store.email}
                        </p>

                        <p>
                            <strong>Address:</strong> {store.store.address}
                        </p>

                        <p>
                            <strong>Average Rating:</strong> {store.averageRating}
                        </p>

                        <p>
                            <strong>Total Ratings:</strong> {store.totalRatings}
                        </p>

                    </div>
                </div>

                <h3 className="mt-5">Customer Ratings</h3>

                <table className="table table-bordered mt-3">

                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Rating</th>
                        </tr>
                    </thead>

                    <tbody>

                        {store.ratings.length > 0 ? (
                            store.ratings.map((rating) => (
                                <tr key={rating.id}>
                                    <td>{rating.name}</td>
                                    <td>{rating.email}</td>
                                    <td>{rating.rating} ⭐</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No Ratings Yet
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default OwnerStores;