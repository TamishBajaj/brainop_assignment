import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Post from './components/post/Post';
import Login from './components/login/Login';
import Create from './components/create/Create';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/create-post" element={<Create />} />
            </Routes>
        </Router>
    );
}

export default App;
