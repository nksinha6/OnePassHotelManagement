import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./aadhaarverificationstatus.css";

const AadhaarVerificationStatus = () => {
  const [status, setStatus] = useState("Waiting for guest verification...");
  const [isFailed, setIsFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber, reservationNumber, totalGuests, currentGuest, verifiedGuests = [] } =
    location.state || {};

  useEffect(() => {
    const simulationTimeout = setTimeout(() => {
      // const success = Math.random() > 0.3;
      const success = true; // ✅ Always success for demo (change if needed)

      if (success) {
        setStatus("Verification Successful! Updating summary...");
        setIsFailed(false);

        const newGuest = {
          guestName: `Guest ${currentGuest}`,
          phoneNumber,
          aadhaarStatus: "Verified",
          faceMatchResult: "Success",
          timestamp: new Date().toLocaleTimeString(),
        };

        const updatedGuests = [...verifiedGuests, newGuest];

        setTimeout(() => {
          navigate("/final-summary", {
            state: {
              reservationNumber,
              totalGuests,
              currentGuest,
              verifiedGuests: updatedGuests,
            },
          });
        }, 1500);
      } else {
        setStatus("Verification Failed. Please retry.");
        setIsFailed(true);
      }
    }, 5000);

    return () => clearTimeout(simulationTimeout);
  }, [navigate, phoneNumber, reservationNumber, totalGuests, currentGuest, verifiedGuests]);
  const handleRetry = () => {
    // Logic to resend the verification link or navigate back
    setStatus("Resending verification link...");
    setIsFailed(false);
    setTimeout(() => {
      navigate("/guest-phone-entry", { state: { phoneNumber } });
    }, 1000); // Simulate resending and returning to the phone entry screen
  };

  const handleManualOverride = () => {
    // Logic for manual check-in
    console.log("Manual override initiated for guest with number:", phoneNumber);
    // In a real app, you would navigate to a manual check-in form.
    navigate("/face-capture", { state: { phoneNumber } });
  };

  return (
    <div className="status-container">
      <div className="status-card">
        <h2 className="header">Aadhaar Verification</h2>
        <p className="subheader">A verification link has been sent to guest's phone.</p>
        <div className="status-message">
          <p className={isFailed ? "status-failed" : "status-pending"}>{status}</p>
          {!isFailed && <div className="spinner"></div>}
        </div>
        
        {isFailed && (
          <div className="action-buttons">
            <button className="retry-button" onClick={handleRetry}>Retry</button>
            <button className="manual-button" onClick={handleManualOverride}>Manual Override</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AadhaarVerificationStatus;
