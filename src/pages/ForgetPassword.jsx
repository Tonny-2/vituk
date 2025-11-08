
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );

            if (response.data.success) {
                setSuccess(
                    "Password reset link has been sent to your email. Please check your inbox."
                );
                setEmail("");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to send reset email. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div style={{ maxWidth: "400px", width: "100%" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Forgot Password</h2>
                        <p className="text-center text-muted mb-4">
                            Enter your email address and we'll send you a link to reset your
                            password.
                        </p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default ForgotPassword;