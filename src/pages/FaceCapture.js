// src/pages/FaceCapture.js
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import "./facecapture.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const FaceCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("Pending");
  const [isCapturing, setIsCapturing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [stream, setStream] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber } = location.state || {};

  // Start webcam on mount
  useEffect(() => {
    async function enableCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints
        });
        setStream(mediaStream);
        console.log("Webcam started successfully");

        // Auto-capture first frame after a small delay (to ensure feed is live)
        setTimeout(() => {
          if (webcamRef.current) {
            handleAutoCapture();
          }
        }, 3000);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
    enableCamera();

    // Cleanup → stop camera when leaving page
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Webcam stopped");
      }
    };
  }, [stream, handleAutoCapture]);

  const performFaceMatch = () => Math.random() > 0.2; // Simulated

  const handleAutoCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setImgSrc(imageSrc);
    setIsCapturing(true);
    setVerificationStatus("Processing...");
    setShowConfirm(false);

    setTimeout(() => {
      const matchSuccess = performFaceMatch(imageSrc);
      if (matchSuccess) {
        setVerificationStatus("Success");
        setShowConfirm(true);
      } else {
        setVerificationStatus("Failed");
      }
      setIsCapturing(false);
    }, 3000);
  };

  const handleRetry = () => {
    setImgSrc(null);
    setVerificationStatus("Pending");
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    console.log("Face match confirmed for:", phoneNumber);
    navigate("/verification-summary", { state: { phoneNumber } });
  };

  const handleManualVerification = () => {
    console.log("Manual verification selected for:", phoneNumber);
    navigate("/dependent-linking", { state: { phoneNumber } });
  };

  return (
    <div className="face-capture-container">
      <div className="face-capture-card">
        <h2 className="header">Guest Verification – Step 2: Face Capture</h2>
        <p className="subheader">Align face in the green circle and wait for auto-capture.</p>

        <div className="camera-area">
          {imgSrc ? (
            <img src={imgSrc} alt="Captured" className="captured-image" />
          ) : (
            <div className="webcam-container">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="webcam-feed"
              />
              {/* ✅ Green circle overlay */}
              <div className="face-guide-circle"></div>
            </div>
          )}
        </div>

        <div className="status-display">
          <p>
            Status:{" "}
            <span className={`status-${verificationStatus.toLowerCase()}`}>
              {verificationStatus}
            </span>
          </p>
        </div>

        <div className="button-group">
          {imgSrc ? (
            <>
              <button
                className="secondary-button"
                onClick={handleRetry}
                disabled={isCapturing}
              >
                Retry Capture
              </button>
              {showConfirm && (
                <button className="primary-button" onClick={handleConfirm}>
                  Confirm Match
                </button>
              )}
            </>
          ) : (
            <button className="primary-button" onClick={handleAutoCapture}>
              Capture Face
            </button>
          )}

          <button className="fallback-button" onClick={handleManualVerification}>
            Manual Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceCapture;
