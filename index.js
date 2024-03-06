

// const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = 3000;
const { addUser,loginUser,isAdmin,authenticateToken,getAllUsers } = require('./services/UserService'); // Assuming named export
const sequelize = require('./database');  // Import your Sequelize instance
const User = require('./models/User');  // Import your model

sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
});

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'opptunity',
//   password: 'postgres',
//   port: '5432',  // Default PostgreSQL port is 5432
// });


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/addUser', async (req, res) => {
    try {
      // Extract user details from request body or query params
    //   const { username, password, email } = req.body; // Assuming you're receiving JSON payload
  
      const newUser = await addUser('admin', 'password', 'admin','admin');
      res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
      console.error('Failed to add user:', error);
      res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
  });


  app.get('/loginUser', async (req, res) => {
    try {
      // Extract user details from request body or query params
    //   const { username, password, email } = req.body; // Assuming you're receiving JSON payload
  
      const newUser = await loginUser('admin', 'password');
      res.status(201).json({ message: 'User logged successfully', user: newUser });
    } catch (error) {
      console.error('Failed to add user:', error);
      res.status(500).json({ message: 'Failed to log user', error: error.message });
    }
  });

  app.get('/addUseer', authenticateToken, isAdmin, async (req, res) => {
    try {
       
    
        const newUser = await addUser('majid', 'password', 'majid','majid');
        res.status(201).json({ message: 'User added successfully', user: newUser });
      } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ message: 'Failed to add user', error: error.message });
      }

  });


  app.get('/getusers', authenticateToken, isAdmin, async (req, res) => {
    try {
       
    
        const users = await getAllUsers();
        res.json(users);
      } catch (error) {
        console.error('Failed to add user:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
          }

  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});