import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import imf from '../../assets/signup.jpg'
import icoon from '../../assets/contract2.gif'
import PasswordInput from '../passwordInput/PasswordInput';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', name: '', profilePicture: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/v1/users/signup', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/posts');
        } catch (error) {
            setError(error.response.data.message);
        }
    }

  return (
    <div className="signup_form">

        <div className='img_left'>
            <img src={imf} className='left_img'/>
        </div>

        <div className='right_content'>

       
            <form className="signup_main" onSubmit={handleSubmit}>
                <img src={icoon} className='icn' />
                <h2 className="signup_head">Get Started</h2>
                {error && <p className="">{error}</p>}
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="inptt" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="inptt" />
                {/* <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="inptt" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="inptt" /> */}
                <PasswordInput label="Password" value={formData.password} onChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })} />
                <PasswordInput label="Confirm Password" value={formData.confirmPassword} onChange={(e) => handleChange({ target: { name: 'confirmPassword', value: e.target.value } })} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} className="inptt" />
                <input type="text" name="profilePicture" placeholder="Profile Picture URL" onChange={handleChange} className="inptt" />
                <label className="">
                    <input type="checkbox" required className="" /> I agree to the terms and conditions
                </label>
                <button type="submit" className="signup_btn">Signup</button>

                <h3 className='linkss'>Already a user?   <a href='/login' className='lgn_link'>Login</a></h3>
            </form>

            </div>
        </div>
  )
}

export default Signup