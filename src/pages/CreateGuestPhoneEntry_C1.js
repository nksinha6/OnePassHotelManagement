// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./createguestphoneentry.css";
// import { Modal } from "react-bootstrap";
// import api from "../api"; // if you have an Axios instance, otherwise use fetch

// const SuccessModal = ({ show, handleClose, message }) => {
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Body className="text-center py-4">
//         <div className="success-animation">
//           <svg
//             className="checkmark"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 52 52"
//           >
//             <circle
//               className="checkmark__circle"
//               cx="26"
//               cy="26"
//               r="25"
//               fill="none"
//             />
//             <path
//               className="checkmark__check"
//               fill="none"
//               d="M14.1 27.2l7.1 7.2 16.7-16.8"
//             />
//           </svg>
//         </div>
//         <h4 className="mt-3 text-success">Success!</h4>
//         <p className="text-muted">{message || "Operation successful."}</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// // Modal for showing guest details
// const GuestDetailsModal = ({ show, handleClose, guest }) => {
//   if (!guest) return null;
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Guest Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           <strong>Phone Number:</strong> {guest.phoneNumber}
//         </p>
//         <p>
//           <strong>Aadhaar Status:</strong> {guest.aadhaarStatus}
//         </p>
//         <p>
//           <strong>Face Status:</strong> {guest.faceStatus}
//         </p>
//         <p>
//           <strong>Timestamp:</strong> {guest.timestamp}
//         </p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// const GuestPhoneEntry = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { totalGuests, bookingId } = location.state || {};
//   const [guests, setGuests] = useState([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [selectedGuest, setSelectedGuest] = useState(null);

//   // Initialize guest list
//   useEffect(() => {
//     if (totalGuests) {
//       const initialGuests = Array.from({ length: totalGuests }, () => ({
//         phoneNumber: "",
//         isVerified: false,
//         aadhaarStatus: "pending", // pending | processing | verified
//         faceStatus: "pending", // pending | processing | verified
//         timestamp: null,
//       }));
//       setGuests(initialGuests);
//     }
//   }, [totalGuests]);

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].phoneNumber = value;
//     setGuests(updatedGuests);
//   };

//   const handleVerifyGuest = (index) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].isVerified = true;
//     updatedGuests[index].timestamp = new Date().toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     const phone = updatedGuests[index].phoneNumber;

//     if (phone === "9104622293") {
//       updatedGuests[index].aadhaarStatus = "verified";
//       updatedGuests[index].faceStatus = "processing";
//       setGuests(updatedGuests);

//       setTimeout(() => {
//         const faceUpdated = [...updatedGuests];
//         faceUpdated[index].faceStatus = "verified";
//         setGuests(faceUpdated);
//       }, 7000);
//     } else {
//       updatedGuests[index].aadhaarStatus = "processing";
//       setGuests(updatedGuests);

//       setTimeout(() => {
//         const aadhaarUpdated = [...updatedGuests];
//         aadhaarUpdated[index].aadhaarStatus = "verified";
//         aadhaarUpdated[index].faceStatus = "processing";
//         setGuests(aadhaarUpdated);

//         setTimeout(() => {
//           const faceUpdated = [...aadhaarUpdated];
//           faceUpdated[index].faceStatus = "verified";
//           setGuests(faceUpdated);
//         }, 7000);
//       }, 5000);
//     }
//   };

//   const handleChangeNumber = (index) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].isVerified = false;
//     updatedGuests[index].phoneNumber = "";
//     updatedGuests[index].aadhaarStatus = "pending";
//     updatedGuests[index].faceStatus = "pending";
//     updatedGuests[index].timestamp = null;
//     setGuests(updatedGuests);
//   };

//   const handleConfirmCheckIn = () => {
//     setShowSuccessModal(true);
//     setModalMessage("Booking check-in Successful!");
//     setTimeout(() => {
//       setShowSuccessModal(false);
//       navigate("/reservation-entry");
//     }, 1500);
//   };

//   const handleCancelVerification = () => {
//     if (window.confirm("Cancel verification process?")) {
//       navigate("/reservation-entry");
//     }
//   };

//   const allGuestsFullyVerified =
//     guests.length > 0 &&
//     guests.every(
//       (g) =>
//         g.isVerified &&
//         g.aadhaarStatus === "verified" &&
//         g.faceStatus === "verified"
//     );

//   const hasAnyVerified = guests.some(
//     (g) => g.aadhaarStatus === "verified" && g.faceStatus === "verified"
//   );

//   return (
//     <div className="guest-verification-container">
//       <div className="card form-card">
//         <h2 className="header">
//           Verify Guests for Booking ID:{" "}
//           <span className="highlight">{bookingId || "VXXXXXX"}</span>
//         </h2>

//         <div className="guest-table-container">
//           <table className="guest-table">
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Guest Phone</th>
//                 {guests.some((g) => g.isVerified) && <th>Aadhaar Status</th>}
//                 {guests.some((g) => g.isVerified) && <th>Face ID</th>}
//                 {guests.some((g) => g.isVerified) && <th>Timestamp</th>}
//                 {hasAnyVerified && <th>Guest Details</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {guests.map((guest, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {!guest.isVerified ? (
//                       <div className="verify-row">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           placeholder="Enter 10-digit phone"
//                           value={guest.phoneNumber}
//                           onChange={(e) =>
//                             handlePhoneNumberChange(index, e.target.value)
//                           }
//                           maxLength="10"
//                           pattern="[0-9]{10}"
//                         />
//                         <button
//                           className="verify-button"
//                           onClick={() => handleVerifyGuest(index)}
//                           disabled={guest.phoneNumber.length !== 10}
//                         >
//                           Verify Guest
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="verified-phone">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           value={guest.phoneNumber}
//                           disabled
//                         />
//                         {guest.aadhaarStatus !== "verified" && (
//                           <span
//                             className="change-link"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleChangeNumber(index);
//                             }}
//                           >
//                             change number
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </td>

//                   {guest.isVerified && (
//                     <>
//                       <td>
//                         {guest.aadhaarStatus === "processing" ? (
//                           <div className="aadhaar-status">
//                             <span className="yellow-dot"></span>
//                             <span className="resend-link">
//                               resend verification link
//                             </span>
//                           </div>
//                         ) : guest.aadhaarStatus === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : (
//                           "-"
//                         )}
//                       </td>

//                       <td>
//                         {guest.faceStatus === "processing" ? (
//                           <div className="aadhaar-status">
//                             <span className="yellow-dot"></span>
//                             <span className="resend-link">
//                               Retry Face Match
//                             </span>
//                             <span className="resend-link">
//                               Verify Face ID Manually
//                             </span>
//                           </div>
//                         ) : guest.faceStatus === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : (
//                           "-"
//                         )}
//                       </td>

//                       <td>{guest.timestamp || "-"}</td>

//                       {guest.aadhaarStatus === "verified" &&
//                         guest.faceStatus === "verified" && (
//                           <td>
//                             <span
//                               className="details-link"
//                               onClick={() => {
//                                 setSelectedGuest(guest);
//                                 setShowGuestModal(true);
//                               }}
//                             >
//                               View Details
//                             </span>
//                           </td>
//                         )}
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="button-group-bottom">
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={handleCancelVerification}
//           >
//             Cancel Verification
//           </button>
//           <button
//             type="button"
//             className="submit-button"
//             onClick={handleConfirmCheckIn}
//             disabled={!allGuestsFullyVerified}
//           >
//             Submit & Confirm Check-in
//           </button>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <SuccessModal
//           show={showSuccessModal}
//           handleClose={() => setShowSuccessModal(false)}
//           message={modalMessage}
//         />
//       )}

//       {/* Guest Details Modal */}
//       {showGuestModal && (
//         <GuestDetailsModal
//           show={showGuestModal}
//           handleClose={() => setShowGuestModal(false)}
//           guest={selectedGuest}
//         />
//       )}
//     </div>
//   );
// };

// export default GuestPhoneEntry;

// /*/*/*/*
// ---------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./createguestphoneentry.css";
// import { Modal, Spinner } from "react-bootstrap";
// import api from "../api"; // Axios instance

// // Success Modal
// const SuccessModal = ({ show, handleClose, message }) => {
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Body className="text-center py-4">
//         <div className="success-animation">
//           <svg
//             className="checkmark"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 52 52"
//           >
//             <circle
//               className="checkmark__circle"
//               cx="26"
//               cy="26"
//               r="25"
//               fill="none"
//             />
//             <path
//               className="checkmark__check"
//               fill="none"
//               d="M14.1 27.2l7.1 7.2 16.7-16.8"
//             />
//           </svg>
//         </div>
//         <h4 className="mt-3 text-success">Success!</h4>
//         <p className="text-muted">{message || "Operation successful."}</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// // Guest Details Modal
// const GuestDetailsModal = ({ show, handleClose, guest }) => {
//   if (!guest) return null;
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Guest Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           <strong>Phone Number:</strong> {guest.phoneNumber}
//         </p>
//         <p>
//           <strong>Aadhaar Status:</strong> {guest.aadhaarStatus}
//         </p>
//         <p>
//           <strong>Face Status:</strong> {guest.faceStatus}
//         </p>
//         <p>
//           <strong>Timestamp:</strong> {guest.timestamp}
//         </p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// const GuestPhoneEntry = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { totalGuests, bookingId } = location.state || {};

//   const [guests, setGuests] = useState([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [selectedGuest, setSelectedGuest] = useState(null);
//   const [loadingStatus, setLoadingStatus] = useState({}); // { index: true/false }

//   // Initialize guest list
//   useEffect(() => {
//     if (totalGuests) {
//       const initialGuests = Array.from({ length: totalGuests }, () => ({
//         phoneNumber: "",
//         isVerified: false,
//         aadhaarStatus: "pending",
//         faceStatus: "pending",
//         timestamp: null,
//       }));
//       setGuests(initialGuests);
//     }
//   }, [totalGuests]);

//   // ✅ API call using Axios to get Aadhaar and Face status
//   const fetchGuestStatus = async (phoneNumber) => {
//     try {
//       const phoneCountryCode = "+91";
//       const token = localStorage.getItem("authToken");

//       const response = await api.get("/api/HotelGuestRead/guest_by_id", {
//         params: {
//           phoneCountryCode,
//           phoneno: 9876543210,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("Guest API Response:", response.data);

//       const aadhaarStatus =
//         typeof response.data.aadhaarStatus === "object"
//           ? response.data.aadhaarStatus.status || "pending"
//           : response.data.aadhaarStatus || "pending";

//       const faceStatus =
//         typeof response.data.faceStatus === "object"
//           ? response.data.faceStatus.status || "pending"
//           : response.data.faceStatus || "pending";

//       return { aadhaarStatus, faceStatus };
//     } catch (error) {
//       console.error("Error fetching guest status:", error);
//       return { aadhaarStatus: "pending", faceStatus: "pending" };
//     }
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].phoneNumber = value;
//     setGuests(updatedGuests);
//   };

//   const handleVerifyGuest = async (index) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].isVerified = true;
//     updatedGuests[index].timestamp = new Date().toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     setGuests(updatedGuests);

//     setLoadingStatus((prev) => ({ ...prev, [index]: true }));

//     const phone = updatedGuests[index].phoneNumber;
//     const status = await fetchGuestStatus(phone);

//     updatedGuests[index].aadhaarStatus = status.aadhaarStatus;
//     updatedGuests[index].faceStatus = status.faceStatus;
//     setGuests(updatedGuests);

//     setLoadingStatus((prev) => ({ ...prev, [index]: false }));
//   };

//   const handleChangeNumber = (index) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index] = {
//       phoneNumber: "",
//       isVerified: false,
//       aadhaarStatus: "pending",
//       faceStatus: "pending",
//       timestamp: null,
//     };
//     setGuests(updatedGuests);
//   };

//   const handleConfirmCheckIn = () => {
//     setShowSuccessModal(true);
//     setModalMessage("Booking check-in Successful!");
//     setTimeout(() => {
//       setShowSuccessModal(false);
//       navigate("/reservation-entry");
//     }, 1500);
//   };

//   const handleCancelVerification = () => {
//     if (window.confirm("Cancel verification process?")) {
//       navigate("/reservation-entry");
//     }
//   };

//   const allGuestsFullyVerified =
//     guests.length > 0 &&
//     guests.every(
//       (g) =>
//         g.isVerified &&
//         g.aadhaarStatus === "verified" &&
//         g.faceStatus === "verified"
//     );

//   const hasAnyVerified = guests.some(
//     (g) => g.aadhaarStatus === "verified" && g.faceStatus === "verified"
//   );

//   return (
//     <div className="guest-verification-container">
//       <div className="card form-card">
//         <h2 className="header">
//           Verify Guests for Booking ID:{" "}
//           <span className="highlight">{bookingId || "VXXXXXX"}</span>
//         </h2>

//         <div className="guest-table-container">
//           <table className="guest-table">
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Guest Phone</th>
//                 {guests.some((g) => g.isVerified) && <th>Aadhaar Status</th>}
//                 {guests.some((g) => g.isVerified) && <th>Face ID</th>}
//                 {guests.some((g) => g.isVerified) && <th>Timestamp</th>}
//                 {hasAnyVerified && <th>Guest Details</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {guests.map((guest, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {!guest.isVerified ? (
//                       <div className="verify-row">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           placeholder="Enter 10-digit phone"
//                           value={guest.phoneNumber}
//                           onChange={(e) =>
//                             handlePhoneNumberChange(index, e.target.value)
//                           }
//                           maxLength="10"
//                           pattern="[0-9]{10}"
//                         />
//                         <button
//                           className="verify-button"
//                           onClick={() => handleVerifyGuest(index)}
//                           disabled={guest.phoneNumber.length !== 10}
//                         >
//                           Verify Guest
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="verified-phone">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           value={guest.phoneNumber}
//                           disabled
//                         />
//                         {guest.aadhaarStatus !== "verified" && (
//                           <span
//                             className="change-link"
//                             onClick={(e) => {
//                               e.preventDefault();
//                               handleChangeNumber(index);
//                             }}
//                           >
//                             change number
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </td>

//                   {guest.isVerified && (
//                     <>
//                       <td>
//                         {loadingStatus[index] ? (
//                           <Spinner animation="border" size="sm" />
//                         ) : guest.aadhaarStatus === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : guest.aadhaarStatus === "processing" ? (
//                           <span>Processing...</span>
//                         ) : (
//                           <span>Pending</span>
//                         )}
//                       </td>

//                       <td>
//                         {loadingStatus[index] ? (
//                           <Spinner animation="border" size="sm" />
//                         ) : guest.faceStatus === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : guest.faceStatus === "processing" ? (
//                           <span>Processing...</span>
//                         ) : (
//                           <span>Pending</span>
//                         )}
//                       </td>

//                       <td>{guest.timestamp || "-"}</td>

//                       {guest.aadhaarStatus === "verified" &&
//                         guest.faceStatus === "verified" && (
//                           <td>
//                             <span
//                               className="details-link"
//                               onClick={() => {
//                                 setSelectedGuest(guest);
//                                 setShowGuestModal(true);
//                               }}
//                             >
//                               View Details
//                             </span>
//                           </td>
//                         )}
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="button-group-bottom">
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={handleCancelVerification}
//           >
//             Cancel Verification
//           </button>
//           <button
//             type="button"
//             className="submit-button"
//             onClick={handleConfirmCheckIn}
//             disabled={!allGuestsFullyVerified}
//           >
//             Submit & Confirm Check-in
//           </button>
//         </div>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <SuccessModal
//           show={showSuccessModal}
//           handleClose={() => setShowSuccessModal(false)}
//           message={modalMessage}
//         />
//       )}

//       {/* Guest Details Modal */}
//       {showGuestModal && (
//         <GuestDetailsModal
//           show={showGuestModal}
//           handleClose={() => setShowGuestModal(false)}
//           guest={selectedGuest}
//         />
//       )}
//     </div>
//   );
// };

// export default GuestPhoneEntry;

// ------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./createguestphoneentry.css";
// import { Modal, Spinner } from "react-bootstrap";
// import api from "../api"; // Axios instance

// // ✅ Success Modal
// const SuccessModal = ({ show, handleClose, message }) => {
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Body className="text-center py-4">
//         <div className="success-animation">
//           <svg
//             className="checkmark"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 52 52"
//           >
//             <circle
//               className="checkmark__circle"
//               cx="26"
//               cy="26"
//               r="25"
//               fill="none"
//             />
//             <path
//               className="checkmark__check"
//               fill="none"
//               d="M14.1 27.2l7.1 7.2 16.7-16.8"
//             />
//           </svg>
//         </div>
//         <h4 className="mt-3 text-success">Success!</h4>
//         <p className="text-muted">{message || "Operation successful."}</p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// // ✅ Guest Details Modal
// const GuestDetailsModal = ({ show, handleClose, guest }) => {
//   if (!guest) return null;
//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Guest Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           <strong>Full Name:</strong> {guest.fullName}
//         </p>
//         <p>
//           <strong>Phone Number:</strong> {guest.phoneNumber}
//         </p>
//         <p>
//           <strong>Email:</strong> {guest.email}
//         </p>
//         <p>
//           <strong>Nationality:</strong> {guest.nationality}
//         </p>
//         <p>
//           <strong>Gender:</strong> {guest.gender}
//         </p>
//         <p>
//           <strong>Date of Birth:</strong>
//           {guest.dateOfBirth
//             ? new Date(guest.dateOfBirth).toLocaleDateString("en-GB")
//             : ""}
//         </p>
//         <p>
//           <strong>Aadhaar Verification:</strong> {guest.aadhaarStatus}
//         </p>
//         <p>
//           <strong>Face Status:</strong> {guest.faceStatus}
//         </p>
//         <p>
//           <strong>Timestamp:</strong> {guest.timestamp}
//         </p>
//       </Modal.Body>
//     </Modal>
//   );
// };

// const GuestPhoneEntry = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { totalGuests, bookingId } = location.state || {};

//   const [guests, setGuests] = useState([]);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [showGuestModal, setShowGuestModal] = useState(false);
//   const [selectedGuest, setSelectedGuest] = useState(null);
//   const [loadingStatus, setLoadingStatus] = useState({});

//   // Initialize guests
//   useEffect(() => {
//     if (totalGuests) {
//       const initialGuests = Array.from({ length: totalGuests }, () => ({
//         phoneNumber: "",
//         isVerified: false,
//         aadhaarStatus: "Pending",
//         faceStatus: "Pending",
//         timestamp: null,
//       }));
//       setGuests(initialGuests);
//     }
//   }, [totalGuests]);

//   // ✅ API 1: Fetch Guest Details with ID validation
//   const fetchGuestByPhone = async (phoneNumber) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await api.get("/api/HotelGuestRead/guest_by_id", {
//         params: {
//           phoneCountryCode: "+91",
//           phoneno: phoneNumber,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data;
//       console.log("Guest API Response:", data);

//       // If invalid ID, skip mapping
//       if (!data.id || data.id === "00000000-0000-0000-0000-000000000000") {
//         return { validGuest: false };
//       }

//       return {
//         validGuest: true,
//         guestId: data.id,
//         fullName: data.fullName,
//         phoneNumber: data.phoneNumber,
//         email: data.email,
//         nationality: data.nationality,
//         gender: data.gender,
//         dateOfBirth: data.dateOfBirth,
//         aadhaarStatus: data.verificationStatus,
//         faceStatus: "Pending",
//       };
//     } catch (error) {
//       console.error("Error fetching guest:", error);
//       return { validGuest: false };
//     }
//   };

//   // ✅ API 2: Update Aadhaar Status
//   const updateAadhaarStatus = async (guestId, verificationStatus) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await api.post(
//         "/api/guest/persist/update_aadhar",
//         {
//           id: guestId,
//           verificationStatus: verificationStatus || "Pending",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Aadhaar Update Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating Aadhaar status:", error);
//       return null;
//     }
//   };

//   // ✅ Handle Verify Button
//   const handleVerifyGuest = async (index) => {
//     const updatedGuests = [...guests];
//     const phone = updatedGuests[index].phoneNumber;

//     if (!phone || phone.length !== 10) return;
//     setLoadingStatus((prev) => ({ ...prev, [index]: true }));

//     const guestData = await fetchGuestByPhone(phone);

//     if (!guestData.validGuest) {
//       alert("Guest not found or invalid ID. Please check the phone number.");
//       setLoadingStatus((prev) => ({ ...prev, [index]: false }));
//       return;
//     }

//     await updateAadhaarStatus(guestData.guestId, guestData.aadhaarStatus);

//     updatedGuests[index] = {
//       ...updatedGuests[index],
//       isVerified: true,
//       aadhaarStatus: guestData.aadhaarStatus,
//       faceStatus: guestData.faceStatus,
//       fullName: guestData.fullName,
//       email: guestData.email,
//       nationality: guestData.nationality,
//       gender: guestData.gender,
//       dateOfBirth: guestData.dateOfBirth,
//       timestamp: new Date().toLocaleString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setGuests(updatedGuests);
//     setLoadingStatus((prev) => ({ ...prev, [index]: false }));
//   };

//   const handlePhoneNumberChange = (index, value) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index].phoneNumber = value;
//     setGuests(updatedGuests);
//   };

//   const handleChangeNumber = (index) => {
//     const updatedGuests = [...guests];
//     updatedGuests[index] = {
//       phoneNumber: "",
//       isVerified: false,
//       aadhaarStatus: "Pending",
//       faceStatus: "Pending",
//       timestamp: null,
//     };
//     setGuests(updatedGuests);
//   };

//   const handleConfirmCheckIn = () => {
//     setShowSuccessModal(true);
//     setModalMessage("Booking Check-in Successful!");
//     setTimeout(() => {
//       setShowSuccessModal(false);
//       navigate("/reservation-entry");
//     }, 1500);
//   };

//   const handleCancelVerification = () => {
//     if (window.confirm("Cancel verification process?")) {
//       navigate("/reservation-entry");
//     }
//   };

//   const allGuestsFullyVerified =
//     guests.length > 0 &&
//     guests.every(
//       (g) =>
//         g.isVerified &&
//         g.aadhaarStatus?.toLowerCase() === "verified" &&
//         g.faceStatus?.toLowerCase() === "verified"
//     );

//   const hasAnyVerified = guests.some(
//     (g) =>
//       g.aadhaarStatus?.toLowerCase() === "verified" &&
//       g.faceStatus?.toLowerCase() === "verified"
//   );

//   return (
//     <div className="guest-verification-container">
//       <div className="card form-card">
//         <h2 className="header">
//           Verify Guests for Booking ID:{" "}
//           <span className="highlight">{bookingId || "VXXXXXX"}</span>
//         </h2>

//         <div className="guest-table-container">
//           <table className="guest-table">
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Guest Phone</th>
//                 {guests.some((g) => g.isVerified) && <th>Aadhaar Status</th>}
//                 {guests.some((g) => g.isVerified) && <th>Face ID</th>}
//                 {guests.some((g) => g.isVerified) && <th>Timestamp</th>}
//                 {hasAnyVerified && <th>Guest Details</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {guests.map((guest, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     {!guest.isVerified ? (
//                       <div className="verify-row">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           placeholder="Enter 10-digit phone"
//                           value={guest.phoneNumber}
//                           onChange={(e) =>
//                             handlePhoneNumberChange(index, e.target.value)
//                           }
//                           maxLength="10"
//                           pattern="[0-9]{10}"
//                         />
//                         <button
//                           className="verify-button"
//                           onClick={() => handleVerifyGuest(index)}
//                           disabled={guest.phoneNumber.length !== 10}
//                         >
//                           {loadingStatus[index] ? (
//                             <Spinner animation="border" size="sm" />
//                           ) : (
//                             "Verify Guest"
//                           )}
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="verified-phone">
//                         <input
//                           className="phone-input"
//                           type="tel"
//                           value={guest.phoneNumber}
//                           disabled
//                         />
//                         {guest.aadhaarStatus?.toLowerCase() !== "verified" && (
//                           <span
//                             className="change-link"
//                             onClick={() => handleChangeNumber(index)}
//                           >
//                             change number
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </td>

//                   {guest.isVerified && (
//                     <>
//                       <td>
//                         {guest.aadhaarStatus?.toLowerCase() === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : (
//                           <span>{guest.aadhaarStatus}</span>
//                         )}
//                       </td>
//                       <td>
//                         {guest.faceStatus?.toLowerCase() === "verified" ? (
//                           <span className="verified-text">✔ Verified</span>
//                         ) : (
//                           <span>Pending</span>
//                         )}
//                       </td>
//                       <td>{guest.timestamp}</td>
//                       {guest.aadhaarStatus?.toLowerCase() === "verified" &&
//                         guest.faceStatus?.toLowerCase() === "verified" && (
//                           <td>
//                             <span
//                               className="details-link"
//                               onClick={() => {
//                                 setSelectedGuest(guest);
//                                 setShowGuestModal(true);
//                               }}
//                             >
//                               View Details
//                             </span>
//                           </td>
//                         )}
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="button-group-bottom">
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={handleCancelVerification}
//           >
//             Cancel Verification
//           </button>
//           <button
//             type="button"
//             className="submit-button"
//             onClick={handleConfirmCheckIn}
//             disabled={!allGuestsFullyVerified}
//           >
//             Submit & Confirm Check-in
//           </button>
//         </div>
//       </div>

//       {showSuccessModal && (
//         <SuccessModal
//           show={showSuccessModal}
//           handleClose={() => setShowSuccessModal(false)}
//           message={modalMessage}
//         />
//       )}

//       {showGuestModal && (
//         <GuestDetailsModal
//           show={showGuestModal}
//           handleClose={() => setShowGuestModal(false)}
//           guest={selectedGuest}
//         />
//       )}
//     </div>
//   );
// };

// export default GuestPhoneEntry;

// ********************************************

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./createguestphoneentry.css";
import { Modal, Spinner } from "react-bootstrap";
import api from "../api"; // Axios instance

// ✅ Success Modal
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

// ✅ Guest Details Modal
const GuestDetailsModal = ({ show, handleClose, guest }) => {
  if (!guest) return null;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Guest Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Full Name:</strong> {guest.fullName}
        </p>
        <p>
          <strong>Phone Number:</strong> {guest.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {guest.email}
        </p>
        <p>
          <strong>Nationality:</strong> {guest.nationality}
        </p>
        <p>
          <strong>Gender:</strong> {guest.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong>
          {guest.dateOfBirth
            ? new Date(guest.dateOfBirth).toLocaleDateString("en-GB")
            : ""}
        </p>
        <p>
          <strong>Aadhaar Verification:</strong> {guest.aadhaarStatus}
        </p>
        <p>
          <strong>Face Status:</strong> {guest.faceStatus}
        </p>
        <p>
          <strong>Timestamp:</strong> {guest.timestamp}
        </p>
      </Modal.Body>
    </Modal>
  );
};

const GuestPhoneEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalGuests, bookingId } = location.state || {};

  const [guests, setGuests] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({});

  // Initialize guests
  useEffect(() => {
    if (totalGuests) {
      const initialGuests = Array.from({ length: totalGuests }, () => ({
        phoneNumber: "",
        isVerified: false,
        aadhaarStatus: "Pending",
        faceStatus: "Pending",
        timestamp: null,
      }));
      setGuests(initialGuests);
    }
  }, [totalGuests]);

  // ✅ API: Fetch or Create Guest
  const fetchGuestByPhone = async (phoneNumber, index) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await api.get("/api/HotelGuestRead/guest_by_id", {
        params: {
          phoneCountryCode: "+91",
          phoneno: phoneNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log("Guest API Response:", data);

      // Guest exists
      if (data.id && data.id !== "00000000-0000-0000-0000-000000000000") {
        return {
          validGuest: true,
          guestId: data.id,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          email: data.email,
          nationality: data.nationality,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          aadhaarStatus: data.verificationStatus,
          faceStatus: "Pending",
        };
      }

      // Guest not found → create new guest
      console.warn("Guest not found, creating new guest...");

      const createResponse = await api.post(
        "/api/guest/persist/persist_guest",
        {
          linkedPrimaryGuestId: null,
          fullName: `Guest ${index + 1}`, // Default name
          dateOfBirth: null,
          gender: null,
          phoneCountryCode: "+91",
          phoneNumber: phoneNumber,
          email: null,
          nationality: null,
          verificationStatus: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newGuest = createResponse.data;
      console.log("New Guest Created:", newGuest);

      return {
        validGuest: true,
        guestId: newGuest.id,
        fullName: newGuest.fullName || `(New Guest)`,
        phoneNumber: newGuest.phoneNumber,
        email: newGuest.email,
        nationality: newGuest.nationality,
        gender: newGuest.gender,
        dateOfBirth: newGuest.dateOfBirth,
        aadhaarStatus: "Pending",
        faceStatus: "Pending",
      };
    } catch (error) {
      console.error("Error fetching or creating guest:", error);
      return { validGuest: false };
    }
  };

  // ✅ API: Update Aadhaar Status
  const updateAadhaarStatus = async (guestId, verificationStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.post(
        "/api/guest/persist/update_aadhar",
        {
          id: guestId,
          verificationStatus: verificationStatus || "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Aadhaar Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating Aadhaar status:", error);
      return null;
    }
  };

  // ✅ Handle Verify Button
  const handleVerifyGuest = async (index) => {
    const updatedGuests = [...guests];
    const phone = updatedGuests[index].phoneNumber;

    if (!phone || phone.length !== 10) return;
    setLoadingStatus((prev) => ({ ...prev, [index]: true }));

    const guestData = await fetchGuestByPhone(phone, index);

    if (!guestData.validGuest) {
      alert(
        "Guest not found and could not be created. Please check the phone number."
      );
      setLoadingStatus((prev) => ({ ...prev, [index]: false }));
      return;
    }

    await updateAadhaarStatus(guestData.guestId, guestData.aadhaarStatus);

    updatedGuests[index] = {
      ...updatedGuests[index],
      isVerified: true,
      aadhaarStatus: guestData.aadhaarStatus,
      faceStatus: guestData.faceStatus,
      fullName: guestData.fullName,
      email: guestData.email,
      nationality: guestData.nationality,
      gender: guestData.gender,
      dateOfBirth: guestData.dateOfBirth,
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setGuests(updatedGuests);
    setLoadingStatus((prev) => ({ ...prev, [index]: false }));
  };

  const handlePhoneNumberChange = (index, value) => {
    const updatedGuests = [...guests];
    updatedGuests[index].phoneNumber = value;
    setGuests(updatedGuests);
  };

  const handleChangeNumber = (index) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = {
      phoneNumber: "",
      isVerified: false,
      aadhaarStatus: "Pending",
      faceStatus: "Pending",
      timestamp: null,
    };
    setGuests(updatedGuests);
  };

  const handleConfirmCheckIn = () => {
    setShowSuccessModal(true);
    setModalMessage("Booking Check-in Successful!");
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/reservation-entry");
    }, 1500);
  };

  const handleCancelVerification = () => {
    if (window.confirm("Cancel verification process?")) {
      navigate("/reservation-entry");
    }
  };

  const allGuestsFullyVerified =
    guests.length > 0 &&
    guests.every(
      (g) =>
        g.isVerified &&
        g.aadhaarStatus?.toLowerCase() === "verified" &&
        g.faceStatus?.toLowerCase() === "verified"
    );

  const hasAnyVerified = guests.some(
    (g) =>
      g.aadhaarStatus?.toLowerCase() === "verified" &&
      g.faceStatus?.toLowerCase() === "verified"
  );

  return (
    <div className="guest-verification-container">
      <div className="card form-card">
        <h2 className="header">
          Verify Guests for Booking ID:{" "}
          <span className="highlight">{bookingId || "VXXXXXX"}</span>
        </h2>

        <div className="guest-table-container">
          <table className="guest-table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Guest Phone</th>
                {guests.some((g) => g.isVerified) && <th>Aadhaar Status</th>}
                {guests.some((g) => g.isVerified) && <th>Face ID</th>}
                {guests.some((g) => g.isVerified) && <th>Timestamp</th>}
                {hasAnyVerified && <th>Guest Details</th>}
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {!guest.isVerified ? (
                      <div className="verify-row">
                        <input
                          className="phone-input"
                          type="tel"
                          placeholder="Enter 10-digit phone"
                          value={guest.phoneNumber}
                          onChange={(e) =>
                            handlePhoneNumberChange(index, e.target.value)
                          }
                          maxLength="10"
                          pattern="[0-9]{10}"
                        />
                        <button
                          className="verify-button"
                          onClick={() => handleVerifyGuest(index)}
                          disabled={guest.phoneNumber.length !== 10}
                        >
                          {loadingStatus[index] ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Verify Guest"
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="verified-phone">
                        <input
                          className="phone-input"
                          type="tel"
                          value={guest.phoneNumber}
                          disabled
                        />
                        {guest.aadhaarStatus?.toLowerCase() !== "verified" && (
                          <span
                            className="change-link"
                            onClick={() => handleChangeNumber(index)}
                          >
                            change number
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {guest.isVerified && (
                    <>
                      <td>
                        {guest.aadhaarStatus?.toLowerCase() === "verified" ? (
                          <span className="verified-text">✔ Verified</span>
                        ) : (
                          <span>{guest.aadhaarStatus}</span>
                        )}
                      </td>
                      <td>
                        {guest.faceStatus?.toLowerCase() === "verified" ? (
                          <span className="verified-text">✔ Verified</span>
                        ) : (
                          <span>Pending</span>
                        )}
                      </td>
                      <td>{guest.timestamp}</td>
                      {guest.aadhaarStatus?.toLowerCase() === "verified" &&
                        guest.faceStatus?.toLowerCase() === "verified" && (
                          <td>
                            <span
                              className="details-link"
                              onClick={() => {
                                setSelectedGuest(guest);
                                setShowGuestModal(true);
                              }}
                            >
                              View Details
                            </span>
                          </td>
                        )}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group-bottom">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelVerification}
          >
            Cancel Verification
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleConfirmCheckIn}
            disabled={!allGuestsFullyVerified}
          >
            Submit & Confirm Check-in
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

      {showGuestModal && (
        <GuestDetailsModal
          show={showGuestModal}
          handleClose={() => setShowGuestModal(false)}
          guest={selectedGuest}
        />
      )}
    </div>
  );
};

export default GuestPhoneEntry;
