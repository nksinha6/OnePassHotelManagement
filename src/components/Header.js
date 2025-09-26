import React, { useState } from "react";
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { BsBell, BsQuestionCircle, BsGear, BsPerson, BsBoxArrowRight, BsSearch } from "react-icons/bs";
import "./header.css";

import { useNavigate } from "react-router-dom";


const Header = ({ onSidebarToggle }) => {
  const { role, logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // const handleExitSandbox = () => {
  //   setShowDropdown(false);
  // };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login", { replace: true });
  };

  return (
    <div className="sticky-top header-blur custom-header-bg d-flex justify-content-between align-items-center mb-3 px-2 py-2">
      {/* Left: Logo and sidebar toggle */}
      <div className="d-flex align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          className="d-md-none me-2"
          onClick={onSidebarToggle}
        >
          ☰
        </Button>
      </div>

      {/* Center: Search bar */}
      <div className="flex-grow-1 d-flex justify-content-start">
        <InputGroup className="search-input-group ms-4" size="sm">
          <InputGroup.Text className="search-icon-bg">
            <BsSearch size={14} color="rgb(73, 73, 75)" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            className="search-input-custom"
          />
        </InputGroup>
      </div>

      {/* Right: Help, Notifications, Profile */}
      <div className="d-flex align-items-center ms-auto gap-1">
        {/* <div className="button_icons">
        <button title="Apps">
          <BsUiChecksGrid  size={20} />
        </button>
        </div> */}
        <div className="button_icons"> 
        <button title="Help">
          <BsQuestionCircle size={20} />
        </button>
        </div>
        <div className="button_icons">
        <button title="Notifications">
          <BsBell size={20} />
        </button>
        </div>

        <Dropdown align="end" show={showDropdown} onToggle={setShowDropdown}>
          <Dropdown.Toggle
            as={Button}
            variant="light"
            className="user-plus-toggle"
            title="User Menu"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ border: 'none', boxShadow: 'none', background: 'transparent', padding: 0 }}
            id="user-menu-toggle"
            children={<BsPerson   size={22} />}
            bsPrefix="btn"
          />
          <Dropdown.Menu
            className="dropdown-menu-end p-3"
            style={{ minWidth: "260px" }}
          >
            {/* Header */}
            <div className="text-center mb-2">
              <div
                className="rounded-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center"
                style={{ width: 36, height: 36 }}
              >
                {(user && user.charAt(0).toUpperCase()) || "U"}
              </div>
              <div className="fw-bold mt-2 text-capitalize">
                {user || "Name"}
              </div>
              <div className="fw-bold mt-2 text-capitalize">
                {role || "Unit Admin"}
              </div>
            </div>
            <hr />
            {/* <Button
              variant="outline-secondary"
              size="sm"
              className="w-100 mb-3"
              onClick={handleExitSandbox}
            >
              Exit sandbox
            </Button> */}

            <Dropdown.Item className="d-flex align-items-center">
              <BsGear className="me-2" />
              Settings
            </Dropdown.Item>

            {/* <Dropdown.Item className="d-flex align-items-center">
              <BsArrowRepeat className="me-2" />
              Switch sandbox
            </Dropdown.Item> */}

            {/* <Dropdown.Item className="d-flex align-items-center">
              <BsPeople className="me-2" />
              Other accounts
            </Dropdown.Item> */}

            {/* <Dropdown.Item className="d-flex align-items-center">
              <BsPerson className="me-2" />
              {user || "Vicky Sonaiya"}
            </Dropdown.Item> */}

            <Dropdown.Item
              className="d-flex align-items-center text-danger"
              onClick={handleLogout}
            >
              <BsBoxArrowRight className="me-2" />
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
