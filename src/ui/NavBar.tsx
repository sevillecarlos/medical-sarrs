import React, { useEffect } from "react";
import { Navbar, Image, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/img/logo-sarrs.png";
import { authAction } from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./style/NavBar.css";

import { jwtDecoded } from "../helpers/jwtDecoded";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    dispatch(authAction.getToken());
    return () => {
      // cleanup;
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      const { first_name, username } = jwtDecoded(auth.token);
      setFirstName(first_name);
      setUserName(username);
    }
    return () => {
      // cleanup;
    };
  }, [auth.token]);

  const signOut = () => dispatch(authAction.clearToken());

  return (
    <Navbar className="nav-bar">
      <Navbar.Brand href="/">
        <Image src={logo} className="logo-image" rounded />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {auth.token ? (
            <>
              {" "}
              <Nav.Link href="/records">Medical Records</Nav.Link>
              <Nav.Link href="/appointment">Appointment Registration</Nav.Link>
              <Nav.Link href="/inventory/">Inventory</Nav.Link>
              <NavDropdown
                className="user-dropdown"
                title={`Hi ${firstName.split(" ").shift()}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.ItemText>{userName}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
              </NavDropdown>{" "}
            </>
          ) : (
            <Nav.Link className="brand-title" href="/">
              SARRS
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
