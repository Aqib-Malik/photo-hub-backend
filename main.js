// main.js
const express = require('express');
const cors = require('cors');
const AuthRoutes = require('./routes/routes');
const imageRoutes = require('./routes/image');
const mongoose = require('mongoose');



const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://evjk3360:zr71c9tdQryYtqc3@ac-53hpfpm-shard-00-00.y5a5h9a.mongodb.net:27017,ac-53hpfpm-shard-00-01.y5a5h9a.mongodb.net:27017,ac-53hpfpm-shard-00-02.y5a5h9a.mongodb.net:27017/?ssl=true&replicaSet=atlas-8z8203-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });





app.use('/', AuthRoutes);
app.use('/images', imageRoutes);
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});










// const express = require('express');
// const http = require('http').Server(express);
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());

// // Define mongoose schema for user
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// const User = mongoose.model('User', userSchema);

// mongoose.connect('mongodb://evjk3360:zr71c9tdQryYtqc3@ac-53hpfpm-shard-00-00.y5a5h9a.mongodb.net:27017,ac-53hpfpm-shard-00-01.y5a5h9a.mongodb.net:27017,ac-53hpfpm-shard-00-02.y5a5h9a.mongodb.net:27017/?ssl=true&replicaSet=atlas-8z8203-shard-0&authSource=admin&retryWrites=true&w=majority')
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//   });

// // Registration API
// app.post('/register', async (req, res) => {
//   console.log(req.body);
//     const { username, password } = req.body;

//     try {
//         // Check if the username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({
//             username,
//             password: hashedPassword
//         });

//         // Save the user to the database
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// // Login API
// app.post('/login', async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;

//   try {
//       // Check if the username exists
//       const user = await User.findOne({ username });
//       if (!user) {
//           return res.status(400).json({ message: 'Invalid username or password' });
//       }

//       // Verify password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//           return res.status(400).json({ message: 'Invalid username or password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

//       res.json({ token });
//   } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server is listening at http://localhost:${port}`);
// });




