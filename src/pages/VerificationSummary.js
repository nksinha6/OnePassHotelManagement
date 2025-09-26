// src/pages/VerificationSummary.js

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./verificationsummary.css"; // Create this CSS file

const VerificationSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve data from the previous screen's state
  // We'll use mock data as a fallback for demonstration
  const {
    guestName = "Jane Doe",
    phoneNumber = "9876543210",
    aadhaarStatus = "Verified",
    faceMatchStatus = "Success",
    dependents = []
  } = location.state || {};

  const handleConfirmVerification = () => {
    // System Action: Mark guest as "Verified & Completed."
    // System Action: Store verification data tied to reservation ID.
    // In a real application, this would be an API call to your backend.
    console.log("Guest verification confirmed. Data stored:", {
      guestName,
      phoneNumber,
      aadhaarStatus,
      faceMatchStatus,
      dependents,
    });

    alert("Guest verification completed!");
    // After confirmation, you would typically move to the next logical step,
    // like the check-in completion screen or a page to add another guest.
    // For this flow, we'll navigate back to the dashboard.
    navigate("/final-summary");
  };

  const handleAddAnotherGuest = () => {
    // System Action: Add Another Guest (Takes to Screen 2 again for next adult)
    navigate("/guest-phone-entry");
  };

  const handleBack = () => {
    // Navigate back to the dependent linking screen for corrections.
    // We pass the current state back so the data is not lost.
    navigate("/dependent-linking", { state: { dependents } });
  };

  return (
    <div className="verification-summary-container">
      <div className="summary-card">
        <h2 className="header">Guest Verification – Summary</h2>
        <p className="subheader">Review details before moving to the next guest.</p>

        <div className="summary-details">
          <div className="detail-item">
            <span className="label">Guest Name:</span>
            <span className="value">{guestName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Phone Number:</span>
            <span className="value">{phoneNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Aadhaar Verification Status:</span>
            <span className={`value status-${aadhaarStatus.toLowerCase()}`}>{aadhaarStatus}</span>
          </div>
          <div className="detail-item">
            <span className="label">Face Match Status:</span>
            <span className={`value status-${faceMatchStatus.toLowerCase()}`}>{faceMatchStatus}</span>
          </div>
          <div className="detail-item">
            <span className="label">Number of Dependents Linked:</span>
            <span className="value">{dependents.length}</span>
          </div>
        </div>
        
        {dependents.length > 0 && (
          <div className="dependents-section">
            <h4>Dependent Details</h4>
            <ul>
              {dependents.map((dep) => (
                <li key={dep.id}>
                  <strong>{dep.fullName}</strong> ({dep.ageCategory}, {dep.relation}) - Status: <span className={`status-${dep.verificationStatus.toLowerCase()}`}>{dep.verificationStatus}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="button-group">
          <button type="button" className="secondary-button" onClick={handleBack}>
            Back
          </button>
          <button type="button" className="secondary-button" onClick={handleAddAnotherGuest}>
            Add Another Guest
          </button>
          <button type="button" className="primary-button" onClick={handleConfirmVerification}>
            Confirm Guest Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSummary;