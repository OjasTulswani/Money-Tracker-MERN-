import React, {useState} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'



const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //form submit
    const submitHandler = async (values) =>{
        try {
            setLoading(true)
            await axios.post('/users/register', values)
            message.success('Successfully registered!')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong...')
        }
    }

  return (
    <>
        <div className='register-page'>
            {loading && <Spinner />}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1>Register</h1>
                
                <Form.Item label= "Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label= "Email" name="email">
                    <Input type='email' />
                </Form.Item>
                <Form.Item label= "Password" name="password">
                    <Input type='password'/>
                </Form.Item>

                <div className="flex justify-between">
                    <Link to="/login" >Already Register? Login...</Link>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Register
                    </button>
                </div>
            </Form>

        </div>
    </>
  )
}

export default Register
