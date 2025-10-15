// // src/pages/Login.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Form, Button, Container, Card } from "react-bootstrap";

// const Login = () => {
//   const [role] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Mock authentication + JWT token
//     if (username && password) {
//       const mockToken = "mock.jwt.token";
//       login(role, username, mockToken);
//       navigate("/");
//     }
//   };

//   const isLoginDisabled = !username || !password;

//   return (
//     <Container className="d-flex align-items-center justify-content-center">
//       <Card style={{ width: "400px" }} className="p-4 shadow">
//         <h4 className="text-center mb-3">Login</h4>
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//           {/* <Form.Group className="mb-3">
//             <Form.Label>Select Role</Form.Label>
//             <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="">Select Role</option>
//               <option value="unit admin">Unit Admin</option>
//               <option value="company admin">Company Admin</option>
//               <option value="property admin">Property Admin</option>
//               <option value="desk admin">Desk Admin</option>
//             </Form.Select>
//           </Form.Group> */}
//           <Button
//             type="submit"
//             className="w-100"
//             disabled={isLoginDisabled}
//             style={{ backgroundColor: "#1B3635", borderColor: "#1B3635" }}
//           >
//             Login
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;

//Barier Token Process Using Axios and LocalStorage  //

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Form, Button, Container, Card } from "react-bootstrap";
// import api from "../api"; // import your Axios instance

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("Login clicked with:", { username, password });

//     try {
//       // Send credentials to backend
//       const response = await api.post("/api/HotelUser/login", {
//         userId: username, // if backend expects userId
//         tenantId: 1,
//         password,
//       });

//       console.log("Full login response:", response.data);
//       // Assume backend returns { token, role }
//       const { accessToken, refreshToken, role } = response.data;

//       // Save token to localStorage (so interceptor can use it)
//       localStorage.setItem("authToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       // Update AuthContext
//       login(role, username, accessToken);

//       // Redirect after login
//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center">
//       <Card style={{ width: "400px" }} className="p-4 shadow">
//         <h4 className="text-center mb-3">Login</h4>
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Button
//             type="submit"
//             className="w-100"
//             style={{ backgroundColor: "#1B3635", borderColor: "#1B3635" }}
//           >
//             Login
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;
// *-*-
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Card } from "react-bootstrap";
import api from "../api"; // import your Axios instance

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const tenantId = 1; // fixed for now — could be dynamic later

      // Send credentials to backend
      const response = await api.post("/api/HotelUser/login", {
        userId: username,
        tenantId,
        password,
      });

      console.log("Full login response:", response.data);

      const { accessToken, refreshToken, role } = response.data;

      // ✅ Store tokens in localStorage (used by axios interceptor)
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ Store user session in AuthContext
      // Include tenantId here so it’s accessible globally
      login({
        role,
        username,
        accessToken,
        tenantId,
      });

      // Redirect after login
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow" style={{ width: "400px" }}>
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
          <Button
            type="submit"
            className="w-100"
            style={{ backgroundColor: "#1B3635", borderColor: "#1B3635" }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;

// *-*-

// Barier Token Process using Redux and RTK API Call //

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../store/authSlice";
// import { Form, Button, Container, Card } from "react-bootstrap";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) throw new Error("Invalid login");

//       const data = await response.json();
//       const token = data.access_token;

//       // Save to Redux
//       dispatch(loginSuccess({ user: username, token }));

//       // Optionally persist in localStorage
//       localStorage.setItem("token", token);

//       navigate("/");
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed, check credentials");
//     }
//   };

//   const isLoginDisabled = !username || !password;

//   return (
//     <Container className="d-flex align-items-center justify-content-center">
//       <Card style={{ width: "400px" }} className="p-4 shadow">
//         <h4 className="text-center mb-3">Login</h4>
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Username</Form.Label>
//             <Form.Control
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Button
//             type="submit"
//             className="w-100"
//             disabled={isLoginDisabled}
//             style={{ backgroundColor: "#1B3635", borderColor: "#1B3635" }}
//           >
//             Login
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;
