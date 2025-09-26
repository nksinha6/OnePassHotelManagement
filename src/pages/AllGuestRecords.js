import React, { useState } from "react";
import { Table, Modal } from "react-bootstrap";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "./AllGuestRecords.css";
import { HiOutlineDownload } from "react-icons/hi";
import DateHoursFilter from "../components/DateHoursFilter";
import User1 from "../assets/images/User-1.jpg";

const AllGuestRecords = () => {
  const [records] = useState([
    {
    reservation: "RES4001",
    name: "Arjun Mehta",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9876501234",
    verification: "Passport",
    faceMatch: "Match",
    checkIn: "2025-08-18 11:10 AM",
    staffName: "Priya Nair",
    gender: "Male",
    dob: "15 Jul 1985",
    nationality: "Indian",
    govtIdType: "Passport",
    govtIdNumber: "N1234567",
    email: "arjun.mehta@gmail.com",
    aadhaarVerification: {
      status: "Not Applicable",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "18 Aug 2025, 11:25 AM",
      verifiedBy: "HC-User201",
    },
    dependents: [],
  },
  {
    reservation: "RES4002",
    name: "Meera Sharma",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9987123456",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-18 02:00 PM",
    staffName: "Rahul Iyer",
    gender: "Female",
    dob: "22 Mar 1992",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-5612",
    email: "meera.sharma@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "18 Aug 2025, 02:15 PM",
      verifiedBy: "HC-User205",
    },
    dependents: [{ name: "Riya Sharma", age: 3, guardian: "Meera Sharma" }],
  },
  {
    reservation: "RES4003",
    name: "David Johnson",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "7890123456",
    verification: "Passport",
    faceMatch: "Match",
    checkIn: "2025-08-18 05:20 PM",
    staffName: "Sneha Reddy",
    gender: "Male",
    dob: "10 Jan 1980",
    nationality: "British",
    govtIdType: "Passport",
    govtIdNumber: "B9081234",
    email: "david.johnson@yahoo.com",
    aadhaarVerification: {
      status: "Not Applicable",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "18 Aug 2025, 05:35 PM",
      verifiedBy: "HC-User210",
    },
    dependents: [],
  },
  {
    reservation: "RES4004",
    name: "Anjali Verma",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9123456780",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-19 09:15 AM",
    staffName: "Vikram Rao",
    gender: "Female",
    dob: "02 May 1995",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-7812",
    email: "anjali.verma@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "19 Aug 2025, 09:30 AM",
      verifiedBy: "HC-User215",
    },
    dependents: [],
  },
  {
    reservation: "RES4005",
    name: "Mohammed Ali",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9812345678",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-19 01:40 PM",
    staffName: "Kiran Patil",
    gender: "Male",
    dob: "07 Nov 1988",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-9910",
    email: "mohammed.ali@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "19 Aug 2025, 01:55 PM",
      verifiedBy: "HC-User220",
    },
    dependents: [{ name: "Sara Ali", age: 6, guardian: "Mohammed Ali" }],
  },
  {
    reservation: "RES4006",
    name: "Priyanka Desai",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9765432109",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-20 10:00 AM",
    staffName: "Arvind Shetty",
    gender: "Female",
    dob: "29 Aug 1993",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-6712",
    email: "priyanka.desai@yahoo.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "20 Aug 2025, 10:15 AM",
      verifiedBy: "HC-User230",
    },
    dependents: [],
  },
  {
    reservation: "RES4007",
    name: "Rohit Gupta",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9856741230",
    verification: "Driving License",
    faceMatch: "Match",
    checkIn: "2025-08-20 01:30 PM",
    staffName: "Deepika Menon",
    gender: "Male",
    dob: "11 Feb 1991",
    nationality: "Indian",
    govtIdType: "DL",
    govtIdNumber: "DL-AP-91823",
    email: "rohit.gupta@gmail.com",
    aadhaarVerification: {
      status: "Not Applicable",
      faceId: "Match",
      manualVerification: "Required",
      verifiedOn: "20 Aug 2025, 01:45 PM",
      verifiedBy: "HC-User240",
    },
    dependents: [],
  },
  {
    reservation: "RES4008",
    name: "Samantha Lee",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9761209345",
    verification: "Passport",
    faceMatch: "Match",
    checkIn: "2025-08-20 03:10 PM",
    staffName: "Anil Kumar",
    gender: "Female",
    dob: "18 Oct 1987",
    nationality: "American",
    govtIdType: "Passport",
    govtIdNumber: "P9012345",
    email: "samantha.lee@gmail.com",
    aadhaarVerification: {
      status: "Not Applicable",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "20 Aug 2025, 03:25 PM",
      verifiedBy: "HC-User245",
    },
    dependents: [],
  },
  {
    reservation: "RES4009",
    name: "Krishna Reddy",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9789012345",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-21 11:50 AM",
    staffName: "Shweta Singh",
    gender: "Male",
    dob: "06 Apr 1989",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-1111",
    email: "krishna.reddy@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "21 Aug 2025, 12:05 PM",
      verifiedBy: "HC-User255",
    },
    dependents: [],
  },
  {
    reservation: "RES4010",
    name: "Neha Kapoor",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9821345690",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-21 02:15 PM",
    staffName: "Ravi Shankar",
    gender: "Female",
    dob: "14 Sep 1994",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-2211",
    email: "neha.kapoor@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "21 Aug 2025, 02:30 PM",
      verifiedBy: "HC-User260",
    },
    dependents: [{ name: "Kabir Kapoor", age: 2, guardian: "Neha Kapoor" }],
  },
  {
    reservation: "RES4011",
    name: "Rajesh Kumar",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9845632190",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-22 10:20 AM",
    staffName: "Lakshmi Menon",
    gender: "Male",
    dob: "21 Dec 1982",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-7722",
    email: "rajesh.kumar@yahoo.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "22 Aug 2025, 10:35 AM",
      verifiedBy: "HC-User265",
    },
    dependents: [],
  },
  {
    reservation: "RES4012",
    name: "Ananya Iyer",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9767890123",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-22 01:05 PM",
    staffName: "Harsh Vardhan",
    gender: "Female",
    dob: "19 Jun 1996",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-6622",
    email: "ananya.iyer@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "22 Aug 2025, 01:20 PM",
      verifiedBy: "HC-User270",
    },
    dependents: [],
  },
  {
    reservation: "RES4013",
    name: "James Smith",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9701234567",
    verification: "Passport",
    faceMatch: "Match",
    checkIn: "2025-08-22 03:40 PM",
    staffName: "Pooja Rani",
    gender: "Male",
    dob: "03 May 1979",
    nationality: "Canadian",
    govtIdType: "Passport",
    govtIdNumber: "C8790123",
    email: "james.smith@gmail.com",
    aadhaarVerification: {
      status: "Not Applicable",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "22 Aug 2025, 03:55 PM",
      verifiedBy: "HC-User275",
    },
    dependents: [],
  },
  {
    reservation: "RES4014",
    name: "Sneha Patil",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9812233445",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-23 11:25 AM",
    staffName: "Suresh Babu",
    gender: "Female",
    dob: "27 Aug 1991",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-9923",
    email: "sneha.patil@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "23 Aug 2025, 11:40 AM",
      verifiedBy: "HC-User280",
    },
    dependents: [],
  },
  {
    reservation: "RES4015",
    name: "Amit Chawla",
    hotel: "Silver Sands",
    location: "Banjara Hills, Hyderabad",
    phone: "9798765432",
    verification: "Aadhaar",
    faceMatch: "Match",
    checkIn: "2025-08-23 01:50 PM",
    staffName: "Geeta Rani",
    gender: "Male",
    dob: "30 Nov 1987",
    nationality: "Indian",
    govtIdType: "Aadhaar",
    govtIdNumber: "XXXX-XXXX-7729",
    email: "amit.chawla@gmail.com",
    aadhaarVerification: {
      status: "Verified",
      faceId: "Match",
      manualVerification: "Not Required",
      verifiedOn: "23 Aug 2025, 02:05 PM",
      verifiedBy: "HC-User285",
    },
    dependents: [{ name: "Rohan Chawla", age: 4, guardian: "Amit Chawla" }],
  },
  ]);

  const [activeFilter, setActiveFilter] = useState("Checked-in");
  const [showModal, setShowModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleShowDetails = (guest) => {
    setSelectedGuest(guest);
    setShowModal(true);
  };

  // Export CSV
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VerifiedGuests");
    XLSX.writeFile(workbook, "verified_guest_records.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Verified Guest Check-In Records", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [
        [
          "Hotel",
          "Reservation Number",
          "Guest Name",
          "Phone Number",
          "Verification Status",
          "Face Match Result",
          "Check-In Timestamp",
          "Staff Name",
        ],
      ],
      body: records.map((r) => [
        r.hotel,
        r.reservation,
        r.name,
        r.phone,
        r.verification,
        r.faceMatch,
        r.checkIn,
        r.staffName,
      ]),
    });
    doc.save("verified_guest_records.pdf");
  };

  // Mask phone number like +91-98XXX-XXX41
  const maskPhone = (phone) => {
    if (!phone) return "";
    return `+91-${phone.substring(0, 2)}XXX-XXX${phone.slice(-2)}`;
  };

  // Mask Aadhaar (for modal footer)
  const getMaskedAadhaar = (guest) => {
    const last4 = guest.phone.slice(-4);
    return `XXXX XXXX ${last4}`;
  };

  return (
    <div className="container-fluid p-4">
      <h4 className="mb-1">All Guest Records</h4>
      <p className="text-muted mb-3">
        Verified guest information for law enforcement access.
      </p>

      {/* Status filter buttons */}
      <div className="d-flex w-100 mb-3 status-btn-group">
        {[
          "Checked In",
          "Upcoming Reservation",
          "Walk-in Guest",
          "Extended Stay",
          "Checked Out",
        ].map((status) => (
          <button
            key={status}
            className={`status-btn flex-fill ${
              activeFilter === status ? "active" : ""
            }`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Action filters + buttons */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <DateHoursFilter />
        </div>
        <div className="d-flex gap-2">
          <button className="pill-btn" onClick={exportCSV}>
            <HiOutlineDownload size={18} /> Export Excel
          </button>
          <button className="pill-btn" onClick={exportPDF}>
            <HiOutlineDownload size={18} /> Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive custom-table-wrapper">
        <Table hover className="guest-table align-middle">
          <thead>
            <tr>
              <th>Check-in Date</th>
              <th>Property</th>
              <th>Reservation</th>
              <th>Guest Name</th>
              <th>Phone</th>
              <th>Verification</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                {/* 1. Check-in date */}
                <td>{format(new Date(r.checkIn), "d MMM yy, h:mm a")}</td>

                {/* 2. Property */}
                <td>
                  <div className="fw-semibold">{r.hotel}</div>
                  <small className="text-muted">{r.location}</small>
                </td>

                {/* 3. Reservation number */}
                <td>{r.reservation}</td>

                {/* 4. Guest Name */}
                <td>{r.name}</td>

                {/* 5. Phone (masked) */}
                <td>{maskPhone(r.phone)}</td>

                {/* 6. Verification status */}
                <td>
                  {r.verification === "Aadhaar" && r.faceMatch === "Match" ? (
                    <span className="d-flex align-items-center gap-1">
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "green",
                        }}
                      ></span>
                      Aadhaar + Face ID
                    </span>
                  ) : (
                    <span className="d-flex align-items-center gap-1">
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "orange",
                        }}
                      ></span>
                      Manual Verification
                    </span>
                  )}
                </td>

                {/* 7. Details link (row only, no header) */}
                <td>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                    onClick={() => handleShowDetails(r)}
                  >
                    View Details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="border-0"
      >
        <Modal.Body className="p-0 position-relative">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          ></button>

          {selectedGuest && (
            <div className="guest-profile-card">
              <div className="profile-header shadow-sm d-flex align-items-center p-3 border-bottom">
                <div className="d-flex align-items-center me-4 pe-4 border-end">
                  <div className="avatar-circle me-3">
                    <img
                      src={User1}
                      alt={selectedGuest.name}
                      className="guest-avatar"
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">{selectedGuest.name}</h5>
                    <small className="text-muted">
                      {selectedGuest.hotel} | {selectedGuest.location}
                    </small>
                  </div>
                </div>

                <div className="info-section">
                  <p>
                    <span style={{ fontWeight: 600 }}>
                      Check-in Date & Time:
                    </span>{" "}
                    {format(
                      new Date(selectedGuest.checkIn),
                      "d MMM yyyy, h:mm a"
                    )}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Reservation Number:</span>{" "}
                    {selectedGuest.reservation}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Property Name:</span>{" "}
                    {selectedGuest.hotel}
                  </p>
                  <p>
                    <span style={{ fontWeight: 600 }}>Property Location:</span>{" "}
                    {selectedGuest.location}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Personal Information
                        </h6>
                        <p>
                          <span style={{ fontWeight: 600 }}>Gender:</span>{" "}
                          {selectedGuest.gender}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Date of Birth:
                          </span>{" "}
                          {selectedGuest.dob}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Nationality:</span>{" "}
                          {selectedGuest.nationality}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Government ID Type:
                          </span>{" "}
                          {selectedGuest.govtIdType}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Government ID Number:
                          </span>{" "}
                          {selectedGuest.govtIdNumber}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Phone Number:</span>{" "}
                          {maskPhone(selectedGuest.phone)}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Email:</span>{" "}
                          {selectedGuest.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 d-flex flex-column gap-4">
                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Aadhaar Verification
                        </h6>
                        <p>
                          <span style={{ fontWeight: 600 }}>Status:</span>{" "}
                          {selectedGuest.aadhaarVerification.status}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Face ID:</span>{" "}
                          <span
                            style={{
                              color:
                                selectedGuest.aadhaarVerification.faceId ===
                                "Match"
                                  ? "green"
                                  : "red",
                              fontWeight: 600,
                            }}
                          >
                            ●
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.faceId}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Manual Verification:
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.manualVerification}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>Verified On:</span>{" "}
                          {selectedGuest.aadhaarVerification.verifiedOn}
                        </p>
                        <p>
                          <span style={{ fontWeight: 600 }}>
                            Verified By (Hotel Staff ID):
                          </span>{" "}
                          {selectedGuest.aadhaarVerification.verifiedBy}
                        </p>
                      </div>
                    </div>

                    <div className="card shadow-sm border-0">
                      <div className="card-body">
                        <h6 className="mb-3" style={{ fontWeight: 600 }}>
                          Dependents Information
                        </h6>
                        {selectedGuest.dependents.length > 0 ? (
                          selectedGuest.dependents.map((d, idx) => (
                            <div key={idx} className="mb-2">
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  Dependent {idx + 1}:
                                </span>{" "}
                                {d.name} (Age: {d.age})
                              </p>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  Guardian:
                                </span>{" "}
                                {d.guardian}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted">No dependents available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllGuestRecords;
