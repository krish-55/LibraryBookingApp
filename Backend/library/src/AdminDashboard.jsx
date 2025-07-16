import React from "react";
import "./AdminDashboard.css"; // External CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <section>
          <h2>Manage Books</h2>
          <button>Add New Book</button>
          <ul>
            <li>
              <span>Book Title: The Great Gatsby</span>
              <button>Edit</button>
              <button>Delete</button>
            </li>
            {/* Add more books */}
          </ul>
        </section>

        <section>
          <h2>All Reservations</h2>
          <ul>
            <li>
              User ID: 1, Book ID: 101, Status: Active
            </li>
            {/* Add more reservations */}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
