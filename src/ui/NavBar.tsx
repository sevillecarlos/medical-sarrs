import React, { useEffect } from "react";
import {
  Navbar,
  Image,
  Nav,
  NavDropdown,
  Button,
  Form,
  Modal,
} from "react-bootstrap";

import logo from "../assets/img/logo-sarrs.png";
import { authAction, fetchSignUp, fetchUsers } from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useHistory } from "react-router";
import AlertModal from "./AlertModal";
import "./style/NavBar.css";

import { jwtDecoded } from "../helpers/jwtDecoded";
import { useState } from "react";

const NavBar = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userType, setUserType] = useState("");

  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    user_type: "",
  });

  const [showModalAddUser, setShowModalAddUser] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [userNameError, setUserNameError] = useState(false);

  const changeUserForm = (e: any) => {
    if (e.target.name === "username") {
      const checkUserExist = auth.usernames.map((user: any) => user.username);
      if (checkUserExist.includes(e.target.value)) {
        setUserNameError(true);
      } else {
        setUserNameError(false);
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
      }
    } else {
      setUserForm({ ...userForm, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    dispatch(authAction.getToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      const { first_name, username, user_type } = jwtDecoded(auth.token);
      setFirstName(first_name);
      dispatch(authAction.setActiveUser(username));
      setUserName(username);
      setUserType(user_type);
    }
  }, [auth.token, dispatch]);

  useEffect(() => {
    if (auth.msg) {
      setTimeout(() => {
        dispatch(authAction?.clearMsg());
      }, 3000);
    }
  }, [auth.msg, dispatch]);

  const signOut = () => {
    dispatch(authAction.clearToken());
    history.push("/");
  };

  const handleCloseAddUser = () => setShowModalAddUser(false);

  const submitAddUser = (e: any) => {
    e.preventDefault();
    dispatch(fetchSignUp(userForm));
    setShowModalAddUser(false);
    setUserForm({
      first_name: "",
      last_name: "",
      password: "",
      username: "",
      user_type: "",
    });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <AlertModal showCondition={auth.msg !== ""} msg={auth.msg} />
      <Modal
        show={showModalAddUser}
        className="modal-add-supply"
        onHide={handleCloseAddUser}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off" onSubmit={submitAddUser}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className="form-input-add-user"
                required
                type="text"
                onChange={changeUserForm}
                name="first_name"
                placeholder="Ingrese nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type="text"
                onChange={changeUserForm}
                name="last_name"
                placeholder="Ingrese apellido"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type="text"
                onChange={changeUserForm}
                required
                name="username"
                value={userForm.username}
                placeholder="Ingrese usuario"
              />
            </Form.Group>
            {userNameError && (
              <span style={{ color: "red" }}>
                Este usuario esta ocupado.
              </span>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="form-input-add-user"
                type={showPassword ? "text" : "password"}
                onChange={changeUserForm}
                name="password"
                placeholder="Ingrese contraseña"
                required
              />
              <Form.Check
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                label="Mostrar contraseña"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User type</Form.Label>
              <Form.Select
                className="form-input-add-user"
                onChange={changeUserForm}
                name="user_type"
                required
              >
                <option value="">Seleccione el tipo de usuario</option>
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="add-user-btn">
              Agregar Usuario
              <AiOutlineUserAdd style={{ marginLeft: "5px" }} size={20} />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

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
                <Nav.Link href="/medical-records">Historiales Medicos</Nav.Link>
                <Nav.Link href="/appointment">
                  Citas Medicas
                </Nav.Link>
                <Nav.Link href="/inventory">Inventario</Nav.Link>
                <NavDropdown
                  className="user-dropdown"
                  title={`Hi ${firstName.split(" ").shift()}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.ItemText>
                    Ingreso como 
                    <span className="badge-user"> {userName}</span>
                  </NavDropdown.ItemText>
                  {userType === "admin" && (
                    <>
                      <NavDropdown.Item
                        onClick={() => setShowModalAddUser(true)}
                      >
                        Agregar Usuario
                      </NavDropdown.Item>
                      <NavDropdown.Item href="userlist">
                        Lista de Usuario
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signOut}>
                    Salir
                  </NavDropdown.Item>
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
    </>
  );
};

export default NavBar;
