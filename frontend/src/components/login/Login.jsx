import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import imgg from '../../assets/leftimg.jpg'
import icn from '../../assets/wave.gif'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/v1/users/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/posts');
        } catch (error) {
            setError(error.response.data.message);
        }
    };
  return (
    <div className="login_form">
         
       <div className='login_left'>
       
    <form className="main_form" onSubmit={handleSubmit}>
        <img src={icn} className='icnn'/>
    <h2 className="login_head">Welcome Back!</h2>
        {error && <p className="errr">{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="inpt" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="inpt" />
        <button type="submit" className="login_btn">Login</button>

        <h3 className='divert'>New user?  <a href='/' className='links'>Signup</a></h3>
    </form>
    </div> 

    <div className='login_pic'>
        <img src={imgg} alt='' className='login_img'/>
    </div>
</div>
  )
}

export default Login