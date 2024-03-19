import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Register.css"; // Import your custom CSS file for styling

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Successfully registered!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong...");
    }
  };

  // Prevent user from accessing registration if already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <Form layout="vertical" onFinish={submitHandler}>
        <h1 className="font-extrabold text-lg">Register</h1>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <div className="flex justify-between">
          <Link to="/login" className="link-to-login">
            Already Registered? Login...
          </Link>
          <button className="register-button">Register</button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
