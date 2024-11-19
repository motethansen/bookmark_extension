import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../images/icon48.png";
import "./NavbarComponent.css";
import RestoreSessionComponent from "../Pages/RestoreSession/RestoreSessionComponent";
import SaveTabsComponent from "../Pages/SaveTabs/SaveTabsComponent";
import AboutComponent from "../Pages/About/AboutComponent";
const NavbarComponent = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Container className="navbar">
      {/* Navbar */}
      <Navbar collapseOnSelect bg="light" expand="xs">
        <Container>
          <Navbar.Brand onClick={() => setActiveTab("home")} href="#home">
            <img src={logo} className="App-logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#home"
                active={activeTab === "save"}
                onClick={() => setActiveTab("save")}
              >
                Save
              </Nav.Link>
              <Nav.Link
                href="#profile"
                active={activeTab === "restore"}
                onClick={() => setActiveTab("restore")}
              >
                Restore
              </Nav.Link>
              <Nav.Link
                href="#profile"
                active={activeTab === "restore2"}
                onClick={() => setActiveTab("restore2")}
              >
                Restorev2
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content */}
      <Container className="mt-4">
        {activeTab === "home" && (
          <>
            <AboutComponent />
          </>
        )}
        {activeTab === "save" && (
          <>
            <SaveTabsComponent />
          </>
        )}
        {activeTab === "restore" && (
          <>
            <RestoreSessionComponent />
          </>
        )}
        {activeTab === "restore2" && (
          <>
            <RestoreSessionComponent />
          </>
        )}
      </Container>
    </Container>
  );
};

export default NavbarComponent;
