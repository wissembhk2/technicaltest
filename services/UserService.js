const User = require('../models/User'); // Adjust the path to where your User model is defined
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function addUser(username, password, email,type) {
  try {
    const newUser = await User.create({
      username,
      password, // Remember to hash the password in real applications
      email,
      type
    });
    console.log('User added successfully:', newUser);
    return newUser; // Returns the newly created user object
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // It's often a good idea to re-throw the error for further handling
  }
}


async function loginUser(username, password) {
    try {
      // Find the user by username (or email if your application uses email to login)
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
  
      // Compare provided password with stored hashed password
      const isMatch = password== user.password;

      if (!isMatch) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, type: user.type }, // Payload
        process.env.JWT_SECRET, // Secret key, stored in environment variables
        { expiresIn: '1h' } // Options, e.g., token expiration
      );
  
      // Here, you can also generate a token or session for the user upon successful login
      // For simplicity, this example just returns the user (excluding the password for security)
  
      return token
    } catch (error) {
      throw error;
    }
  }

  async function getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'type'] // Specify the attributes you want to retrieve; exclude sensitive data like passwords
      });
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Rethrow the error so it can be caught where the function is called
    }
  }


  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).send('Invalid token.');
    }
  };
  
  const isAdmin = (req, res, next) => {
    if (req.user.type !== 'admin') {
      return res.status(403).send('Access denied. User is not an admin.');
    }
    next();
  };

module.exports= {addUser, loginUser , isAdmin,authenticateToken , getAllUsers}