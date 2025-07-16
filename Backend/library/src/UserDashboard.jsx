import React from "react";
import "./UserDashboard.css";
import { Link,Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchBooks from "./ApiCall";

const UserDashboard = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const fetchedBooks = await fetchBooks();
            setBooks(fetchedBooks);
        };
        getBooks();
    },[]);
    const lastThreeBooks = books.slice(-3);
return (
    <div className="dashboard-container">
        {/* Header Section */}
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

        {/* Content Section */}
        <section className="dashboard-content container-fluid mt-4">
           
            
            {/* Browse Books Section */}
            <div id="browse" className="browse-books-section mb-4">
                <h2>Browse Books</h2>
                <div className="row">
                    {lastThreeBooks.map((book) => (
                                                <div className="col-md-4 mb-4" key={book.id}>
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <h5 className="card-title">Book Title: {book.title}</h5>
                                                            <p className="card-text">Author: {book.author}</p>
                                                            <button className="btn btn-info me-2" id="btnchange"><Link to={`/book/${book.id}`}>View Details</Link></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                    {/* Add more book cards as needed */}
                </div>
            </div>

            {/* Reservation History Section
            <div id="reservations" className="reservations-section">
                <h2>My Reservations</h2>
                <ul className="list-group">
                    <li className="list-group-item">
                        Book Title: <strong>The Great Gatsby</strong> - Status: <em>Active</em>
                    </li>
                    <li className="list-group-item">
                        Book Title: <strong>1984</strong> - Status: <em>Returned</em>
                    </li>
                </ul>
            </div> */}
          
        </section>

        {/* Footer Section */}
        <footer className="dashboard-footer bg-dark text-white text-center p-3 mt-4">
            <p>Contact Us: kirshstylishstar@gmail.com | Phone: +91-8074498041</p>
            <p>© 2025 Library Booking System</p>
        </footer>
    </div>
);
};

export default UserDashboard;
