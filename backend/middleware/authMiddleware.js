// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
require('dotenv').config()

// const protect = async (req, res, next) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith('x-auth-token')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }
//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// }




const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers['x-auth-token']) {
        token = req.headers['x-auth-token'];
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token)
    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.secretKey);

        // Add user to request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = { protect };


// const jwt = require('jsonwebtoken');
// const { secretKey } = require('../utils/constants');


// module.exports = (req, res, next) => {
//   // Get token from header
//   const token_data = req.header('x-auth-token');
//   const token = token_data.split(
//     " ",
//   )[1];

//   console.log(token)

//   // Check if token exists
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.secretKey);

//     // Add user to request object
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };