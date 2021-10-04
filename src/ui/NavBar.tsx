import React from "react";
import { Navbar, Container, Image, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/img/logo-sarrs.png";
import { authAction } from "../store/slices/Auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./style/NavBar.css";

const NavBar = () => {
  return (
    <Navbar className="nav-bar">
      <Navbar.Brand href="/">
        <Image src={logo} className="logo-image" rounded />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className='brand-title' href='/'>SARRS</Nav.Link>

          {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
