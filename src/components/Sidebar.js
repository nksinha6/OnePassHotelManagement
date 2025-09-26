// import React, {useState} from "react";
// import { NavLink } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";
// import onepasslogo from "../assets/images/1pass_logo.jpg";
// import home from "../assets/icons/home.svg";
// import Calendar from "../assets/icons/calendar-cog.svg";
// import Phone from "../assets/icons/smartphone.svg";
// import id from "../assets/icons/id-card.svg";
// // import face from "../assets/icons/scan-face.svg";
// // import Shield from "../assets/icons/shield-check.svg";
// import final from "../assets/icons/file-user.svg";
// import "./sidebar.css";
// import { HiChevronDown, HiChevronUp } from "react-icons/hi"; // add this import

// const Sidebar = ({ show, onClose }) => {
//   const [openReservations, setOpenReservations] = useState(false);


//   return (
//     <div
//       className={`sidebar bg-white border-end p-3 position-fixed top-0 start-0 ${
//         show ? "d-block" : "d-none d-md-block"
//       }`}
//       style={{
//         width: "265px",
//         height: "100vh",
//         zIndex: 1050,
//         overflowY: "auto",
//       }}
//     >
//       <button
//         className="btn btn-sm btn-outline-secondary d-md-none mb-3"
//         onClick={onClose}
//       >
//         ✕
//       </button>

//       <div className="d-flex align-items-center mb-2">
//         <img
//           src={onepasslogo}
//           alt="avatar"
//           className="me-2 logo"
//           width={46}
  // useEffect(() => {
  //   if (location.pathname === "/reservation-entry" || location.pathname === "/mis-report") {
  //     setOpenReservations(true);
  //   } else {
  //     setOpenReservations(false);
  //   }
  // }, [location]);
//             {/* Left: icon + label */}
//             <span className="d-flex align-items-center">
//               <img
//                 src={Calendar}
//                 alt="Reservation"
//                 style={{ width: 16, height: 16, marginRight: 8 }}
//               />
//               Guest Verification
//             </span>

//             {/* Right: arrow */}
//             <span className="d-flex align-items-center">
//               {openReservations ? (
//                 <HiChevronUp size={20} />
//               ) : (
//                 <HiChevronDown size={20} />
//               )}
//             </span>
//           </NavLink>

//           {openReservations && (
//             <div className="GuestsSubRecords nav flex-column">
//               <NavLink
//                 to="/reservation-entry"
//                 className="nav-link sidebar-l2"
//               >
//                 Start New Verification
//               </NavLink>
//             </div>
//           )}
//         </div>
//         {/* <NavLink
//           to="/guest-phone-entry"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={Phone}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Guest Phone Entry
//             </span>
//           )}
//         </NavLink>
//         <NavLink
//           to="/aadhaar-verification"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={id}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Aadhaar Verification
//             </span>
//           )}
//         </NavLink> */}
//         {/* <NavLink
//           to="/face-capture"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={face}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Face Capture
//             </span>
//           )}
//         </NavLink>
//         <NavLink
//           to="/verification-summary"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={Shield}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Verification Summary
//             </span>
//           )}
//         </NavLink> */}
//         {/* <NavLink
//           to="/final-summary"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={final}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Final Summary
//             </span>
//           )}
//         </NavLink> */}
//         {/* <NavLink
//           to="/dependent-linking"
//           className={({ isActive }) =>
//             `nav-link sidebar-l1 ${isActive ? "active" : ""}`
//           }>
//           {({ isActive }) => (
//             <span className="d-flex align-items-center gap-1">
//               <img
//                 src={link}
//                 alt="Phone"
//                 style={{
//                   width: 16,
//                   height: 16,
//                   marginRight: 8,
//                   filter: isActive
//                     ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
//                     : "none",
//                 }}
//               />
//               Dependent Linking
//             </span>
//           )}
//         </NavLink> */}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import onepasslogo from "../assets/images/1pass_logo.jpg";
import home from "../assets/icons/home.svg";
import Calendar from "../assets/icons/calendar-cog.svg";
import "./sidebar.css";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const Sidebar = ({ show, onClose }) => {
  const [openReservations, setOpenReservations] = useState(false);
  const location = useLocation();

  // Keep Guest Verification dropdown open on reservation-entry and mis-report
  useEffect(() => {
    if (location.pathname === "/reservation-entry" || location.pathname === "/mis-report") {
      setOpenReservations(true);
    } else {
      setOpenReservations(false);
    }
  }, [location]);

  return (
    <div
      className={`sidebar bg-white border-end p-3 position-fixed top-0 start-0 ${
        show ? "d-block" : "d-none d-md-block"
      }`}
      style={{
        width: "265px",
        height: "100vh",
        zIndex: 1050,
        overflowY: "auto",
      }}
    >
      <button
        className="btn btn-sm btn-outline-secondary d-md-none mb-3"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="d-flex align-items-center mb-2">
        <img
          src={onepasslogo}
          alt="avatar"
          className="me-2 logo"
          width={46}
          height={46}
        />
      </div>

      <nav className="nav flex-column">
        {/* ✅ Home closes dropdown */}
        <NavLink
          to="/"
          onClick={() => setOpenReservations(false)}
          className={({ isActive }) =>
            `nav-link sidebar-l1 mt ${isActive ? "active" : ""}`
          }
        >
          {({ isActive }) => (
            <span className="d-flex align-items-center">
              <img
                src={home}
                alt="Home"
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 8,
                  filter: isActive
                    ? "invert(34%) sepia(99%) saturate(747%) hue-rotate(186deg) brightness(97%) contrast(101%)"
                    : "none",
                }}
              />
              Home
            </span>
          )}
        </NavLink>

        {/* ✅ Guest Verification Dropdown */}
        <div className="mt-2">
          <button
            className={`nav-link sidebar-l1 d-flex justify-content-between align-items-center w-100 ${openReservations ? "open" : ""}`}
            onClick={() => setOpenReservations(!openReservations)}
            type="button"
            aria-expanded={openReservations}
          >
            <span className="d-flex align-items-center">
              <img
                src={Calendar}
                alt="Reservation"
                style={{ width: 16, height: 16, marginRight: 8 }}
              />
              Guest Verification
            </span>
            <span className="d-flex align-items-center">
              {openReservations ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
            </span>
          </button>

          {openReservations && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/reservation-entry"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
                onClick={e => {
                  // Keep dropdown open when navigating to reservation-entry
                  setOpenReservations(true);
                }}
              >
                Start New Verification
              </NavLink>
            </div>
          )}
          {openReservations && (
            <div className="GuestsSubRecords nav flex-column">
              <NavLink
                to="/mis-report"
                className={({ isActive }) =>
                  `nav-link sidebar-l2 ${isActive ? "active" : ""}`
                }
                onClick={e => {
                  // Keep dropdown open when navigating to mis-report
                  setOpenReservations(true);
                }}
              >
                MIS Reports
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
