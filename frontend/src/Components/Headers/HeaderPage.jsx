import React, { useState } from "react";

import "./Login.css";
import "./HeaderPage.css";
import Icon from "../../Images/blackIcon.png";

import axios from "axios";
import Modals from "../Modals/Modal";
import { Link } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import Register from "../../Components/Register/Register";
import DropdownUser from "../../Components/Dropdown/Dropdown";
import { Jumbotron, Button, Form, Col, Image } from "react-bootstrap";

function HeaderPage() {
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [forms, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://192.168.1.6:50001/api/v1/login",
        forms
      );

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      setShowLogin(false);
      return res;
    } catch (err) {
      const resError = err.response.data.error.message;
      return setError(resError);
    }
  };

  const [handleAddLogin] = useMutation(handleLogin, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", forms);
    },
  });

  const onChange = (e) => {
    setForm({ ...forms, [e.target.name]: e.target.value });
  };

  const isLoggedIn = (e) => {
    e.preventDefault();
    handleAddLogin();
  };

  const exitClickLogin = () => {
    setShowLogin(false);
  };

  const onClickLogin = () => {
    setShowLogin(true);
  };

  const exitClickRegister = () => {
    setShowRegister(false);
  };

  const onClickRegister = () => {
    setShowRegister(true);
  };

  return (
    <div>
      <Jumbotron fluid className="jumbotron-page">
        {localStorage.token ? (
          <>
            <DropdownUser />
          </>
        ) : (
          <>
            <Button variant="flat" className="btn2" onClick={onClickLogin}>
              <p>Login</p>
            </Button>
            <Button variant="flat" className="btn1" onClick={onClickRegister}>
              <p>Register</p>
            </Button>
          </>
        )}

        <Register
          show={showRegister}
          onHide={exitClickRegister}
          setShowRegister={exitClickRegister}
        />

        <Modals
          show={showLogin}
          onHide={exitClickLogin}
          headerCss="header-login"
          header="Login"
          form={
            <Form onSubmit={(e) => isLoggedIn(e)}>
              <Form.Group>
                <Form.Label className="labels">Email</Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    value={forms.email}
                    onChange={(e) => onChange(e)}
                    name="email"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labels">Password</Form.Label>
                <Col>
                  <Form.Control
                    className="ctrl"
                    type="password"
                    value={forms.password}
                    onChange={(e) => onChange(e)}
                    name="password"
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="default" className="btn6">
                Login
              </Button>
            </Form>
          }
          footer={
            <Form.Text muted className="textMuted-7">
              <p>Don't have an account? Klik here</p>
            </Form.Text>
          }
        />
        <Link to="/">
          <Image className="logo" src={Icon} alt="Icon" />
        </Link>
      </Jumbotron>
    </div>
  );
}

export default HeaderPage;
