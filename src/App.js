import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Filter from "./components/DateHoursFilter";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";
import CreateGuestPhoneEntry from "./pages/CreateGuestPhoneEntry";
import CreateReservationEntry from "./pages/CreateReservationEntry";
import MisReport from "./pages/AllGuestRecords";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
// const AadhaarVerificationStatus = lazy(() => import("./pages/AadhaarVerificationStatus"));
// const FaceCapture = lazy(() => import("./pages/FaceCapture"));
// const DependentLinking = lazy(() => import("./pages/DependentLinking"));
// const VerificationSummary = lazy(() => import("./pages/VerificationSummary"));
// const FinalSummary = lazy(() => import("./pages/FinalSummary"));

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="loginForm">
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      <div className="flex-grow-1 main-content">
        <Header onSidebarToggle={() => setShowSidebar(true)} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/reservation-entry"
              element={<CreateReservationEntry />}
            />
            <Route
              path="/guest-phone-entry"
              element={<CreateGuestPhoneEntry />}
            />
            <Route
              path="/mis-report"
              element={<MisReport />}
            />
            <Route
              path="/filtered-mis-report"
              element={<Filter />}
            />
            {/* <Route path="/aadhaar-verification" element={<AadhaarVerificationStatus />} /> */}
            {/* <Route path="/face-capture" element={<FaceCapture />} /> */}
            {/* <Route path="/dependent-linking" element={<DependentLinking />} /> */}
            {/* <Route path="/verification-summary" element={<VerificationSummary />} /> */}
            {/* <Route path="/final-summary" element={<FinalSummary />} /> */}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;
