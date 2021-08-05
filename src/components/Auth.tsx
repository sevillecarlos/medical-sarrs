import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import logo from "../assets/img/logo-sarrs.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./style/Auth.css";

import { authAction, fetchSignIn } from "../store/slices/Auth";

const Auth = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootStateOrAny) => state.auth);

  const [signInForm, setSignInForm] = useState({
    type: "",
    user: "",
    password: "",
  });

  const changeSignInForm = (e: any) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const signIn = async (e: any) => {
    e.preventDefault();
    dispatch(fetchSignIn(signInForm));
  };

//   const tokenExist = localStorage.getItem("$@token");

  return (
    <div className="auth">
      <Card className="card-auth">
        <Card.Title style={{ fontSize: "30px", color: "rgb(36, 28, 28)" }}>
          Sign In
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
              name="type"
            >
              <option value="staff">Staff</option>
              <option value="admin">Administrator</option>
            </Form.Select>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmailSignIn"
              onSubmit={signIn}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="user"
                type="text"
                className="input-auth"
                placeholder="Enter username"
                onChange={changeSignInForm}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordSignIn">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                className="input-auth"
                onChange={changeSignInForm}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>

            <Button className="auth-btn" type="submit">
              Login <MdKeyboardArrowRight size={25} />
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
