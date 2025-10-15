import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import api from "../api";

const GetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authData = JSON.parse(localStorage.getItem("authData"));

        if (!authData?.role?.username || !authData?.role?.tenantId) {
          setError("Missing authentication details in localStorage");
          setLoading(false);
          return;
        }

        const { username, tenantId, accessToken } = authData.role;

        const response = await api.get("/api/HotelUserRead/user_by_id", {
          params: { userId: username, tenantId },
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm border-0 rounded-3">
        <h4 className="mb-4 text-primary fw-semibold">User Details</h4>

        {loading && (
          <div className="d-flex justify-content-center align-items-center p-3">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {data && (
          <div className="d-flex flex-column gap-2">
            <div>
              <strong>User ID:</strong>{" "}
              <span className="text-muted">{data.id}</span>
            </div>
            <div>
              <strong>Tenant ID:</strong>{" "}
              <span className="text-muted">{data.tenantId}</span>
            </div>
            <div>
              <strong>Tenant Name:</strong>{" "}
              <span className="text-muted">{data.tenantName}</span>
            </div>
            <div>
              <strong>Aadhaar Status:</strong>{" "}
              <span className="text-muted">{data.aadharStatus}</span>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default GetData;
