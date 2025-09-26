// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Card } from "react-bootstrap";

const Login = () => {
  const [role] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication + JWT token
    if (username && password) {
      const mockToken = "mock.jwt.token";
      login(role, username, mockToken);
      navigate("/");
    }
  };

  const isLoginDisabled = !username || !password;

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h4 className="text-center mb-3">Login</h4>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="unit admin">Unit Admin</option>
              <option value="company admin">Company Admin</option>
              <option value="property admin">Property Admin</option>
              <option value="desk admin">Desk Admin</option>
            </Form.Select>
          </Form.Group> */}
          <Button type="submit" className="w-100" disabled={isLoginDisabled} style={{ backgroundColor: "#1B3635", borderColor: "#1B3635" }}>
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
