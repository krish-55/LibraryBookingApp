import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchBooks from "./ApiCall";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    const today = new Date().toISOString().split("T")[0];
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    const formattedReturnDate = returnDate.toISOString().split("T")[0];
    const use_id = localStorage.getItem("use_id") || "";
    const token = localStorage.getItem("token") || "";

    const showStatus = () => {
        console.log("Book availability:", book.available); // Debug the value
        if (book.available) {
            setShowModal(true);
        } else {
            toast.error("❌ Book is not available for reservation! some other user has reserved it.");
        }
    };
    

    const reservation = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("❌ Authentication token is missing!");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/reservations",
                {
                    user_id: use_id,
                    book_id: book.id,
                    issue_date: today,
                    return_date: formattedReturnDate,
                    status: "ACTIVE",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            toast.success(`✅ Reservation successful!`);
            setTimeout(() => {
                window.location.href = "/books";
            }, 1000);
        } catch (error) {
            console.error("Server error:", error);
            toast.error("❌ Reservation failed. Please check your internet.");
        }
    };

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                const books = await fetchBooks();
                console.log(books);
                const selectedBook = books.find((b) => b.id.toString() === id);
                
                setBook(selectedBook);
            } catch (error) {
                console.error("Failed to fetch book details:", error);
                toast.error("❌ Failed to load book details. Please try again later.");
            }
        };
        getBookDetails();
    }, [id]);

    if (!book) return <div className="text-center mt-4">Loading book details...</div>;

    return (
        <div className="dashboard-container">
            <ToastContainer />
            <header className="dashboard-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
                <div className="logo">
                    <img src="/logo.png" alt="Library Logo" className="img-fluid" style={{ height: "50px" }} />
                </div>
                <h1 className="m-0">Welcome, {localStorage.getItem("username") || "User"}!</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/books">Available Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/books/reservations">My Reservations</Link>
                        </li>
                    </ul>
                </nav>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        localStorage.removeItem("username");
                        window.location.href = "/";
                    }}
                >
                    Sign Out
                </button>
            </header>
            <div className="container mt-5">
                <h2>Book Title: {book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Description:</strong> {book.description || "No description available."}</p>
                <p><strong>ISBN:</strong> {book.isbn || "N/A"}</p>
                <p><strong>Published:</strong> {book.publishedDate || "N/A"}</p>
                <p><strong>Available:</strong> {book.available}</p>
                <button className="btn btn-info" id="btnchange"><Link to="/books">Back</Link></button>
                <button className="btn btn-success" id="btnchange" onClick={showStatus}>Reservation</button>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Reserve Book</h3>
                            <form id="c1" onSubmit={reservation}>
                                <label>Book Title</label>
                                <input type="text" value={book.title} readOnly />
                                <label>Author</label>
                                <input type="text" value={book.author} readOnly />
                                <label>Issue Date</label>
                                <input type="text" value={today} readOnly />
                                <label>Return Date</label>
                                <input type="text" value={formattedReturnDate} readOnly />
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowModal(false);
                                    }}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <footer className="dashboard-footer bg-dark text-white text-center p-3 mt-4">
                <p>Contact Us: kirshstylishstar@gmail.com | Phone: +91-8074498041</p>
                <p>© 2025 Library Booking System</p>
            </footer>
        </div>
    );
};

export default BookDetails;
