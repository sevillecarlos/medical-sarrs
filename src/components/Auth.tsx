import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import logo from "../assets/img/logo-sarrs.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./style/Auth.css";

import { fetchSignIn, authAction } from "../store/slices/auth";

const Auth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  const [signInForm, setSignInForm] = useState({
    user_type: "",
    username: "",
    password: "",
  });

  const changeSignInForm = (e: any) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    dispatch(fetchSignIn(signInForm));
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(authAction.clearError());
    }, 3000);
  }, [auth.error, dispatch]);

  return (
    <div className="auth">
      <Card className="card-auth">
        <Card.Title style={{ fontSize: "30px", color: "rgb(36, 28, 28)" }}>
          Registrarse
        </Card.Title>
        <Card.Img
          style={{ width: "100px", margin: "auto" }}
          variant="top"
          src={logo}
        />
        <Card.Body>
          <Form onSubmit={signIn}>
            <Form.Select
              className="user-type-select"
              aria-label="Default select example"
              name="user_type"
              required
              onChange={changeSignInForm}
            >
              <option value="">Seleccione el tipo de usuario</option>
              <option value="staff">Staff</option>
              <option value="admin">Administrator</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="formBasicEmailSignIn">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="username"
                type="text"
                className="input-auth"
                required
                placeholder="Ingrese Usuario"
                onChange={changeSignInForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignIn">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                className="input-auth"
                onChange={changeSignInForm}
                required
                type="password"
                placeholder="Ingrese Contraseña"
              />
            </Form.Group>
            {auth.error !== null && <span>{auth.error}</span>}
            <Button className="auth-btn" type="submit">
              Ingresar <MdKeyboardArrowRight size={25} />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
