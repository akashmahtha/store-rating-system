import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function UserStores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const response = await API.get("/user/stores");
            setStores(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const submitRating = async (storeId, rating) => {
        try {
            await API.post("/user/rating", {
                storeId,
                rating,
            });

            alert("Rating Submitted");

            fetchStores();
        } catch (error) {
            alert(error.response?.data?.message || "Failed");
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4">Stores</h2>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Store Name</th>
                            <th>Address</th>
                            <th>Average Rating</th>
                            <th>Your Rating</th>
                        </tr>
                    </thead>

                    <tbody>

                        {stores.map((store) => (
                            <tr key={store.id}>

                                <td>{store.id}</td>

                                <td>{store.name}</td>

                                <td>{store.address}</td>

                                <td>{store.averageRating || "No Rating"}</td>

                                <td>

                                    <select
                                        className="form-select"
                                        defaultValue={store.userRating || ""}
                                        onChange={(e) =>
                                            submitRating(
                                                store.id,
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1 ⭐</option>
                                        <option value="2">2 ⭐</option>
                                        <option value="3">3 ⭐</option>
                                        <option value="4">4 ⭐</option>
                                        <option value="5">5 ⭐</option>
                                    </select>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default UserStores;