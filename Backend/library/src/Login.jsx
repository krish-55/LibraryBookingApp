import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        localStorage.setItem("username", username); // Save username to localStorage

        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", {
                username,
                password,
            });
            console.log(response.data);
            localStorage.setItem("token", response.data.accessToken); // Save JWT token
            localStorage.setItem("use_id", response.data.id); // Save user ID to localStorage
            toast.success(`✅ Welcome, ${response.data.username}! Redirecting...`);
            setTimeout(() => {
                window.location.href = "/dashboard"; // Redirect if needed
            }, 2000);
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid username or password.");
            toast.error("❌ Login failed. Please check your credentials.");
        }
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
            }}
        >
            <ToastContainer />
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <h3 className="text-center mb-3">
                    <i className="fas fa-sign-in-alt me-2"></i>Login to Library Booking
                </h3>
                <p className="text-muted text-center mb-4">
                    Welcome back! Please log in to reserve your favorite spot.
                </p>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fas fa-user"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="btn btn-success w-100 mt-3">
                        <i className="fas fa-sign-in-alt me-2"></i>Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <span>
                        Don't have an account? <a href="/register">Register here</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
