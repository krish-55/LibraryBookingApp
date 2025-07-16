import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {fetchReservations} from "./ApiCall"; // Corrected name
import { useEffect, useState } from "react";
const Reservation = () => {
    const[reservation,setReservations] = useState([]);
    useEffect(() => {
            const getBooks = async () => {
                const fetchedReservations = await fetchReservations();
                setReservations(fetchedReservations);
            };
            getBooks();
        }, []);

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
            <section className="dashboard-content container-fluid mt-4">
                    <div className="container mt-4">
                        <h1 className="text-center mb-4">Reservation Details</h1>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Reservation id</th>
                                        <th>ISBN</th>
                                        <th>Book Title</th>
                                        <th>Issue Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservation.map((reservation,index) => (
                                        <tr key={reservation.id}>
                                            <td>{index+1}</td>
                                            <td>{reservation.id}</td>
                                            <td>{reservation.book.isbn}</td>
                                            <td>{reservation.book.title}</td>
                                            <td>{reservation.issueDate}</td>
                                            <td>{reservation.returnDate}</td>
                                            <td>{reservation.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </section>
            <footer className="dashboard-footer bg-dark text-white text-center p-3 mt-4">
                <p>Contact Us: kirshstylishstar@gmail.com | Phone: +91-8074498041</p>
                <p>© 2025 Library Booking System</p>
            </footer>
        </div>

    );
};

export default Reservation;