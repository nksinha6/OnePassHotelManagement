import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createreservationentry.css";

const ReservationEntry = () => {
  const [bookingId, setBookingID] = useState("");
  const [adults, setAdults] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const BookingIDList = [
    { id: 1, bookingId: "VVQ23001", guestName: "Aarav Patel", guests: 2 },
    { id: 2, bookingId: "VVQ23002", guestName: "Sophia Williams", guests: 4 },
    { id: 3, bookingId: "VVQ23003", guestName: "Liam Johnson", guests: 3 },
    { id: 4, bookingId: "VVQ23004", guestName: "Mia Sharma", guests: 4 },
    { id: 5, bookingId: "VVQ23005", guestName: "Ethan Brown", guests: 3 },
    { id: 6, bookingId: "VVQ23006", guestName: "Olivia Davis", guests: 1 },
    { id: 7, bookingId: "VVQ23007", guestName: "Noah Wilson", guests: 2 },
    { id: 8, bookingId: "VVQ23008", guestName: "Isabella Garcia", guests: 4 },
    { id: 9, bookingId: "VVQ23009", guestName: "James Miller", guests: 2 },
    { id: 10, bookingId: "VVQ23010", guestName: "Amelia Martinez", guests: 1 },
    { id: 11, bookingId: "VVQ23011", guestName: "Benjamin Lee", guests: 2 },
    { id: 12, bookingId: "VVQ23012", guestName: "Charlotte Kim", guests: 1 },
    { id: 13, bookingId: "VVQ23013", guestName: "Alexander Chen", guests: 3 },
  ];

  const handleStartVerification = (e) => {
    e.preventDefault();

    if (!bookingId || !adults || !guestName) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const totalGuests = parseInt(adults, 10);
    localStorage.setItem("totalGuests", totalGuests);

    navigate("/guest-phone-entry", {
      state: {
        bookingId,
        guestName,
        adults: parseInt(adults, 10),
        totalGuests,
        currentGuest: 1,
      },
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  // Deprecated, but keeping it in case you want the side list functionality as well
  // const handleSelectReservation = (reservation) => {
  //   setBookingID(reservation.bookingId);
  //   setAdults(reservation.guests.toString());
  // };

  // New handler for selecting from the modal
  const handleSelectFromModal = (reservation) => {
    setBookingID(reservation.bookingId);
    if (reservation.guests > 1) {
      setGuestName(`${reservation.guestName} +${reservation.guests - 1}`);
    } else {
      setGuestName(reservation.guestName);
    }
    setAdults(reservation.guests.toString());
    setIsModalOpen(false);
    setSearchTerm("");
  };

  // Filter reservations based on search term for the modal
  const filteredReservations = BookingIDList.filter((res) =>
    res.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="reservation-entry-container">
        <div className="card form-card">
          <h2 className="header">Guest Check-In Verification</h2>
          <p className="subheader">
            Enter booking details to begin verification.
          </p>
          <form onSubmit={handleStartVerification}>
            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="bookingId">Booking ID *</label>
              </div>
              <input
                type="text"
                id="bookingId"
                value={bookingId}
                onChange={(e) => setBookingID(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="guestName">Guest Name</label>
              </div>
              <input
                type="text"
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="adults">Number of Guests *</label>
              <input
                type="number"
                id="adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="button-group">
              <button
                type="button"
                className="secondary-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Next
              </button>
            </div>
          </form>
        </div>

        <button
          type="button"
          className="link-button"
          onClick={() => setIsModalOpen(true)}
        >
          Today's Bookings
        </button>
        {/* Reservation List Section (Side Panel)
        <div className="card reservation-list">
          <h3>Booking List</h3>
          <ul>
            {BookingIDList.map((res) => (
              <li
                key={res.id} // Using the new unique ID for the key
                onClick={() => handleSelectReservation(res)}
                className="reservation-item"
              >
                <span className="res-number">{res.bookingId}</span>
                <span className="res-guests">{res.guests} Guests</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Reservation List Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Today's Bookings</h3>
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search by Booking ID..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="modal-reservation-list">
              {filteredReservations.length > 0 ? (
                filteredReservations.map((res) => (
                  <li key={res.id} onClick={() => handleSelectFromModal(res)}>
                    <span className="res-number">{res.bookingId}</span>
                    <span className="res-number">
                      {res.guestName}
                      {res.guests > 1 ? ` +${res.guests - 1}` : ""}
                    </span>
                    <span className="res-guests">{res.guests} Guests</span>
                  </li>
                ))
              ) : (
                <li className="no-results">No bookings found.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationEntry;
