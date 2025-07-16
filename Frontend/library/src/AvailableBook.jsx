import React, { useEffect, useState } from "react";
import { Toast } from "bootstrap";
import "./UserDashboard.css";
import fetchBooks from "./ApiCall";
import { Link } from "react-router-dom";

const AvailableBook = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getBooks = async () => {
            const fetchedBooks = await fetchBooks();
            // const availableBooks = fetchedBooks.filter(book => book.available === true);
            setBooks(fetchedBooks);
        };
        getBooks();
    }, []);

    // Filter books based on search query
    const filteredBooks = books.filter((book) =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="dashboard-container">
            <header className="dashboard-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
                <div className="logo">
                    <img src="/logo.png" alt="Library Logo" className="img-fluid" style={{ height: "50px" }} />
                </div>
                <h1 className="m-0">Welcome, {localStorage.getItem("username") || "User"}!</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
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

            <section className="dashboard-content container-fluid mt-4 ">
                {/* Search Section */}
                <div className="search-section mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for books..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>

                <div className="row">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div className="col-md-4 mb-4" key={book.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">Book Title: {book.title}</h5>
                                        <p className="card-text">Author: {book.author}</p>
                                        <button className="btn btn-info me-2" id="btnchange"><Link to={`/book/${book.id}`}>View Details</Link></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">No books found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            <footer className="dashboard-footer bg-dark text-white text-center p-3 mt-4">
                <p>Contact Us: kirshstylishstar@gmail.com | Phone: +91-8074498041</p>
                <p>© 2025 Library Booking System</p>
            </footer>
        </div>
    );
};

export default AvailableBook;
