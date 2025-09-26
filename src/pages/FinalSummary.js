import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./finalsummary.css";

const SuccessModal = ({ show, handleClose, message }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center py-4">
        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h4 className="mt-3 text-success">Success!</h4>
        <p className="text-muted">{message || "Operation successful."}</p>
      </Modal.Body>
    </Modal>
  );
};

const FinalSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    reservationNumber,
    totalGuests,
    verifiedGuests = [],
  } = location.state || {};

  const [guestStatuses, setGuestStatuses] = useState(() =>
    verifiedGuests.map((guest, idx) => ({
      ...guest,
      aadhaarStatus: idx === verifiedGuests.length - 1 ? "Awaiting" : "Success",
      aadhaarTrafficLight: idx === verifiedGuests.length - 1 ? "yellow" : "green",
      faceMatchResult: idx === verifiedGuests.length - 1 ? "Awaiting" : "Success",
      faceTrafficLight: idx === verifiedGuests.length - 1 ? "yellow" : "green",
      timestamp: guest.timestamp || "19-Aug 17:15",
      showResend: idx === verifiedGuests.length - 1,
    }))
  );

  useEffect(() => {
    guestStatuses.forEach((guest, idx) => {
      if (guest.aadhaarStatus === "Awaiting") {
        // Aadhaar verification blinking (7s → green)
        setTimeout(() => {
          setGuestStatuses((prev) => {
            const updated = [...prev];
            updated[idx] = {
              ...updated[idx],
              aadhaarStatus: "Success",
              aadhaarTrafficLight: "green",
              showResend: false, // remove resend link after success
            };
            return updated;
          });

          // Face Match verification (start after Aadhaar success)
          setTimeout(() => {
            setGuestStatuses((prev) => {
              const updated = [...prev];
              updated[idx] = {
                ...updated[idx],
                faceMatchResult: "Success",
                faceTrafficLight: "green",
                timestamp: new Date().toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
              return updated;
            });
          }, 8000); // Face match success after 8 sec
        }, 7000); // Aadhaar success after 7 sec
      }
    });
    // eslint-disable-next-line
  }, []);

  const allGuestsVerified =
    guestStatuses.length === totalGuests &&
    guestStatuses.every(
      (g) => g.aadhaarStatus === "Success" && g.faceMatchResult === "Success"
    );

  const handleConfirmCheckIn = () => {
    setShowSuccessModal(true);
    setModalMessage("Reservation check-in complete!");
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/");
    }, 1500);
  };

  const handleAddNextGuest = () => {
    navigate("/guest-phone-entry", {
      state: {
        reservationNumber,
        totalGuests,
        currentGuest: verifiedGuests.length + 1,
        verifiedGuests,
      },
    });
  };

  const handleCancelVerification = () => {
    // Fallback CTA - Aborts the entire process.
    if (window.confirm("Are you sure you want to cancel the verification?")) {
      console.log("Verification process cancelled.");
      navigate("/");
    }
  };

  const handleResendVerification = (idx) => {
    setGuestStatuses((prev) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        aadhaarStatus: "Awaiting",
        aadhaarTrafficLight: "yellow",
        faceMatchResult: "Awaiting",
        faceTrafficLight: "yellow",
        timestamp: "",
        showResend: true,
      };
      return updated;
    });
  };
  const handleRetry = (id) => {
    setGuestStatuses((prev) => {
      const updated = [...prev];
      updated[id] = {
        ...updated[id],
        faceMatchResult: "Awaiting",
        faceTrafficLight: "yellow",
        timestamp: "",
        showResend: true,
      };
      return updated;
    });
  };

  return (
    <div className="final-summary-container">
      <div className="summary-card">
        <h2 className="header">Reservation Verification – Progress</h2>
        <p className="subheader">
          Verified {verifiedGuests.length} of {totalGuests} guests
        </p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Phone</th>
                <th>Aadhaar Status</th>
                {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
                  <th>Resend Link</th>
                )}
                <th>Face Match</th>
                {guestStatuses.some((g) => g.faceMatchResult !== "Success") && (
                  <th>Retry faceMatch</th>
                )}
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {guestStatuses.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.guestName}</td>
                  <td>{guest.phoneNumber}</td>
                  <td>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span
                        className={`blinking-circle ${guest.aadhaarTrafficLight}`}
                      />
                      {guest.aadhaarStatus}
                    </span>
                  </td>
                  {guestStatuses.some((g) => g.aadhaarStatus !== "Success") && (
                    <td>
                      {guest.aadhaarStatus !== "Success" &&
                        guest.showResend && (
                          <button
                            onClick={() => handleResendVerification(index)}
                            className="resend-link"
                          >
                            Resend Verification
                          </button>
                        )}
                    </td>
                  )}
                  <td>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span
                        className={`blinking-circle ${guest.faceTrafficLight}`}
                      />
                      {guest.faceMatchResult}
                    </span>
                  </td>
                  {guestStatuses.some(
                    (g) => g.faceMatchResult !== "Success"
                  ) && (
                    <td>
                      {guest.faceMatchResult !== "Success" && (
                        <button
                          onClick={() => handleRetry(index)}
                          className="btn btn-primary"
                        >
                          Retry faceMatch
                        </button>
                      )}
                    </td>
                  )}
                  <td>{guest.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="secondary-button"
            onClick={handleCancelVerification}
          >
            Cancel Verification
          </button>
          {!allGuestsVerified && (
            <button
              type="button"
              className="secondary-button"
              onClick={handleAddNextGuest}
            >
              Add Next Guest
            </button>
          )}
          <button
            type="button"
            className="primary-button"
            onClick={handleConfirmCheckIn}
            disabled={!allGuestsVerified}
          >
            Submit & Confirm Check-In
          </button>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          show={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
          message={modalMessage}
        />
      )}
    </div>
  );
};

export default FinalSummary;
