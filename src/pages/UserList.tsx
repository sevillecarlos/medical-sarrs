import React, { useState, useEffect } from "react";
import { fetchUsers, authAction } from "../store/slices/auth";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  FormControl,
  Form,
  Modal,
  Card,
  InputGroup,
} from "react-bootstrap";

import "./style/UserList.css";

const UserList = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);

  const [ableShowPassword, setAbleShowPassword] = useState(Array<any>());

  const addAbleShowPassword = (id: any) => {
    setAbleShowPassword((prevState: any) => {
      if (prevState?.includes(id)) {
        ableShowPassword.shift();
      }
      return [...prevState, id];//need to fux here
    });
  };

  console.log(ableShowPassword);
  return (
    <div className="user-list">
      {auth.usernames?.map((v: any) => {
        return (
          <Card key={v.id} style={{ width: "50rem" }}>
            <Card.Body>
              <Card.Text>
                {" "}
                <span> First Name: {v.first_name} </span>
                {"        "}
                <span>Last Name: {v.last_name}</span>
                <span>Username: {v.username}</span>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Username"
                    readOnly
                    type={ableShowPassword.includes(v.id) ? "text" : "password"}
                    value={v.password}
                    aria-label="Username"
                    name={v.username}
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text>
                    <Button onClick={() => addAbleShowPassword(v.id)}>
                      {ableShowPassword.includes(v.id) ? "Hide" : "Show"}{" "}
                      Password
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
                <Button variant="primary">Edit user</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default UserList;
