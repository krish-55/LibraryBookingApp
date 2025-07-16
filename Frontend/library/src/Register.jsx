import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; // Import your CSS file here
import axios from "axios";
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = formData;
        let hasError = false;

        if (!username) {
            setErrors((prev) => ({ ...prev, username: "Username is required." }));
            hasError = true;
        }
        if (!email || !email.includes("@")) {
            setErrors((prev) => ({ ...prev, email: "Valid email is required." }));
            hasError = true;
        }
        if (!password || password.length < 6) {
            setErrors((prev) => ({
                ...prev,
                password: "Password must be at least 6 characters.",
            }));
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = response.data;
            console.log("Registration response:", result);
            if (response.status === 200) {
                toast.success("✅ Registration successful! Redirecting to login...");
                setTimeout(() => {
                    window.location.href = "./";
                }, 3000);
            } else {
                if (result.message.includes("Username")) {
                    setErrors((prev) => ({ ...prev, username: result.message }));
                } else if (result.message.includes("Email")) {
                    setErrors((prev) => ({ ...prev, email: result.message }));
                } else {
                    toast.error(result.message || "Something went wrong.");
                }
            }
        } catch (err) {
            console.error("Detailed error:", err);
            if (err.response && err.response.data) {
                const { message } = err.response.data;
                if (message.includes("Username")) {
                    setErrors((prev) => ({ ...prev, username: "Username must be at least 6 characters." }));
                } else if (message.includes("Email")) {
                    setErrors((prev) => ({ ...prev, email: "Please provide a valid email address." }));
                } else if (message.includes("Password")) {
                    setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
                } else {
                    toast.error(message || "Something went wrong.");
                }
            } else {
                toast.error("Error connecting to the server. Please try again later.");
            }
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
                    <i className="fas fa-user-plus me-2"></i>Register for Library Booking
                </h3>
                <p className="text-muted text-center mb-4">
                    Join us and reserve your favorite reading spot today.
                </p>
                <form onSubmit={handleSubmit}>
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
                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username}</div>
                            )}
                        </div>
                        {formData.username && formData.username.length < 6 && (
                            <small className="text-danger">Username must be at least 6 characters.</small>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>
                        {formData.email && !formData.email.includes("@") && (
                            <small className="text-danger">Please enter a valid email address.</small>
                        )}
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
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>
                        {formData.password && formData.password.length < 6 && (
                            <small className="text-danger">Password must be at least 6 characters.</small>
                        )}
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-3">
                        <i className="fas fa-user-plus me-2"></i>Register
                    </button>
                </form>
                <div className="text-center mt-3">
                    <span>
                        Already have an account? <a href="./">Login here</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
