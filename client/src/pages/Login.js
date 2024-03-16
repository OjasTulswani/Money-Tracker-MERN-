import React from 'react'
import {Form, Input} from 'antd'
import { Link } from 'react-router-dom'

const Login = () => {

    //form submit
    const submitHandler = (values) =>{
        console.log(values)
    }

  return (
    <>
    <div className='register-page'>
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
