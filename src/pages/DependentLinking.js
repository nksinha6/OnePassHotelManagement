import React, { useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./dependentlinking.css"; // We'll create this CSS file

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const DependentLinking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const { guardianName, guardianPhoneNumber, guardianAadhaarStatus } = location.state || {
    guardianName: "Simulated Guardian",
    guardianPhoneNumber: "9876543210",
    guardianAadhaarStatus: "Verified",
  };

  const [addDependents, setAddDependents] = useState(false);
  const [dependents, setDependents] = useState([]);
  const [currentDependent, setCurrentDependent] = useState({
    fullName: "",
    dob: "",
    gender: "",
    relation: "",
    aadhaarStatus: "With Aadhaar",
    phoneNumber: "",
    altIdType: "",
    altIdNumber: "",
    faceCapture: null,
    verificationStatus: "Pending",
  });
  const [faceCaptureStatus, setFaceCaptureStatus] = useState("Pending");
  const [tempImgSrc, setTempImgSrc] = useState(null);
  const [isMinor, setIsMinor] = useState(false);

  // Helper function to calculate age from DOB
  // const calculateAge = (dob) => {
  //   const today = new Date();
  //   const birthDate = new Date(dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };

  // Handle dependent form changes
  // const handleDependentChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentDependent((prev) => ({ ...prev, [name]: value }));

  //   if (name === "dob") {
  //     const age = calculateAge(value);
  //     setIsMinor(age < 18);
  //   }
  // };

  // Capture face photo
  const captureFace = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setTempImgSrc(imageSrc);
    setFaceCaptureStatus("Processing...");

    // Simulate face match or just save the image
    setTimeout(() => {
      // Logic for adult face match vs. minor optional capture
      const matchSuccess = isMinor ? true : Math.random() > 0.2; // 80% success for adults
      
      if (matchSuccess) {
        setFaceCaptureStatus("Success");
        setCurrentDependent((prev) => ({ ...prev, faceCapture: imageSrc }));
      } else {
        setFaceCaptureStatus("Failed");
      }
    }, 2000);
  }, [webcamRef, isMinor]);

  // Handle saving a dependent
  const handleSaveDependent = () => {
    // Basic validation
    if (!currentDependent.fullName || !currentDependent.dob || !currentDependent.gender || !currentDependent.relation) {
      alert("Please fill in all mandatory dependent details.");
      return;
    }

    // const age = calculateAge(currentDependent.dob);
    let newStatus = "Partially Verified"; // Default status for 'Without Aadhaar'
    if (currentDependent.aadhaarStatus === "With Aadhaar") {
      // Simulate Aadhaar verification success
      const aadhaarVerified = true; // In a real app, this would be an API check
      newStatus = aadhaarVerified ? "Verified" : "Failed";
    }

    const dependentToSave = {
      ...currentDependent,
      id: Date.now(),
      ageCategory: isMinor ? "Minor" : "Dependent Adult",
      verificationStatus: newStatus,
    };

    setDependents((prev) => [...prev, dependentToSave]);
    resetForm();
  };

  // Reset the form for a new dependent
  const resetForm = () => {
    setCurrentDependent({
      fullName: "",
      dob: "",
      gender: "",
      relation: "",
      aadhaarStatus: "With Aadhaar",
      phoneNumber: "",
      altIdType: "",
      altIdNumber: "",
      faceCapture: null,
      verificationStatus: "Pending",
    });
    setFaceCaptureStatus("Pending");
    setTempImgSrc(null);
    setIsMinor(false);
  };

  // Handle navigation
  const handleFinish = () => {
    navigate("/verification-summary", { state: { dependents } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="dependent-linking-container">
      <div className="card">
        <h2 className="header">Guest Verification – Dependent Linking</h2>
        <p className="subheader">Link dependents to the guardian's record.</p>

        <div className="guardian-info">
          <p><strong>Guardian:</strong> {guardianName}</p>
          <p><strong>Phone:</strong> {guardianPhoneNumber}</p>
          <p><strong>Aadhaar Status:</strong> {guardianAadhaarStatus}</p>
        </div>

        {!addDependents ? (
          <div className="add-dependent-prompt">
            <p>Do you need to add any dependents?</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="addDependents"
                  value="yes"
                  onChange={() => setAddDependents(true)}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="addDependents"
                  value="no"
                  onChange={() => navigate("/verification-summary")}
                /> No
              </label>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-section">
                <h3>Dependent Details</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" value={currentDependent.fullName} onChange={handleDependentChange} required />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="dob" value={currentDependent.dob} onChange={handleDependentChange} required />
                  {currentDependent.dob && <span className="age-category">({isMinor ? "Minor" : "Dependent Adult"})</span>}
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select name="gender" value={currentDependent.gender} onChange={handleDependentChange} required>
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Relation to Guardian *</label>
                  <select name="relation" value={currentDependent.relation} onChange={handleDependentChange} required>
                    <option value="">Select...</option>
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Identification Section</h3>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="aadhaarStatus" value="With Aadhaar" checked={currentDependent.aadhaarStatus === "With Aadhaar"} onChange={handleDependentChange} /> With Aadhaar
                  </label>
                  <label>
                    <input type="radio" name="aadhaarStatus" value="Without Aadhaar" checked={currentDependent.aadhaarStatus === "Without Aadhaar"} onChange={handleDependentChange} /> Without Aadhaar
                  </label>
                </div>

                {currentDependent.aadhaarStatus === "With Aadhaar" ? (
                  <div className="form-group">
                    <label>Dependent Phone Number (Optional)</label>
                    <input type="tel" name="phoneNumber" value={currentDependent.phoneNumber} onChange={handleDependentChange} />
                    <p className="note">Note: Aadhaar verification link will be sent to this number. If empty, will use guardian's number.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Alternative ID Type *</label>
                      <select name="altIdType" value={currentDependent.altIdType} onChange={handleDependentChange} required={currentDependent.aadhaarStatus === "Without Aadhaar"}>
                        <option value="">Select...</option>
                        <option value="Passport">Passport</option>
                        <option value="School ID">School ID</option>
                        <option value="Birth Certificate">Birth Certificate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Alternative ID Number *</label>
                      <input type="text" name="altIdNumber" value={currentDependent.altIdNumber} onChange={handleDependentChange} required={currentDependent.aadhaarStatus === "Without Aadhaar"} />
                    </div>
                  </>
                )}
              </div>

              {/* Face Capture Section */}
              {((!isMinor && currentDependent.aadhaarStatus === "With Aadhaar") || (!isMinor && currentDependent.aadhaarStatus === "Without Aadhaar")) && (
                <div className="form-section">
                  <h3>Face Capture</h3>
                  <div className="camera-area">
                    {tempImgSrc ? (
                      <img src={tempImgSrc} alt="Captured" className="captured-image" />
                    ) : (
                      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} className="webcam-feed" />
                    )}
                  </div>
                  <p>Status: <span className={`status-${faceCaptureStatus.toLowerCase()}`}>{faceCaptureStatus}</span></p>
                  <div className="button-group-capture">
                    {tempImgSrc ? (
                      <button type="button" className="secondary-button" onClick={() => { setTempImgSrc(null); setFaceCaptureStatus("Pending"); }}>Retry</button>
                    ) : (
                      <button type="button" className="primary-button" onClick={captureFace}>Capture Face</button>
                    )}
                  </div>
                </div>
              )}
            </form>

            <div className="button-group-dependent">
              <button type="button" className="secondary-button" onClick={handleBack}>Back</button>
              <button type="button" className="secondary-button" onClick={handleSaveDependent}>Save Dependent</button>
              <button type="button" className="primary-button" onClick={handleFinish}>Finish & Continue</button>
            </div>
            
            <div className="dependent-list">
              <h4>Added Dependents</h4>
              {dependents.length === 0 ? (
                <p>No dependents added yet.</p>
              ) : (
                <ul>
                  {dependents.map((dep) => (
                    <li key={dep.id}>
                      <strong>{dep.fullName}</strong> ({dep.ageCategory}, {dep.relation}) - Status: <span className={`status-${dep.verificationStatus.toLowerCase()}`}>{dep.verificationStatus}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DependentLinking;