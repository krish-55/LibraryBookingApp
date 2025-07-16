import axios from "axios";
const token = localStorage.getItem("token"); // Retrieve stored token
const id=localStorage.getItem("use_id"); // Retrieve stored user ID
const fetchBooks = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/books/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};
export const fetchReservations = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}/reservations`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return [];
    }
};


export default fetchBooks;
