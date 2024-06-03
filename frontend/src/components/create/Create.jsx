import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css'

const Create = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'x-auth-token': token
            }
        };

        try {
            await axios.post('http://localhost:3000/api/v1/posts', formData, config);
            navigate('/posts');
        } catch (error) {
            setError(error.response.data.message);
        }
    };
  return (
    <div className="create_form">
<h2 className="head_create">Create Post</h2>

            <form className="main_create" onSubmit={handleSubmit}>
                
                {error && <p className="">{error}</p>}
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="inpet" />
                <textarea name="content" placeholder="Content" onChange={handleChange} required className="inpet" />
                <button type="submit" className="crte_btn">Create</button>
            </form>
        </div>
  )
}

export default Create