import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
    <div className='register-page'>
        {loading && <Spinner />}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1>Login</h1>
                
                
                <Form.Item label= "Email" name="email">
                    <Input type='email' />
                </Form.Item>
                <Form.Item label= "Password" name="password">
                    <Input type='password'/>
                </Form.Item>

                <div className="flex justify-between">
                    <Link to="/register" >Not a user? Register...</Link>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Login
                    </button>
                </div>
            </Form>

        </div>
      
    </>
  )
}

export default Login
