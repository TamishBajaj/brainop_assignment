const express = require('express');
const cors=require('cors')
const mongoose = require('mongoose');
const connectDB=require('./db/connect')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const { limiter } = require('./middleware/rateLimiter');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json());
app.use(limiter);

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);



// app.use(cors({
//   origin: 'http://localhost:5173' // Allow requests from frontend domain
// }));



const port=process.env.PORT || 3000;

const start=async()=>{
    try{
        await connectDB(process.env.mongoURI)
        app.listen(port,console.log(`Server listening on port ${port} ...`))
    }catch(error){
        console.log(error)
    }

}

start();