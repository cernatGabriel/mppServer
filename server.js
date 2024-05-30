const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const artistsRouter = require('./api/routes/artists');
const albumsRouter = require('./api/routes/albums'); 
const bodyParser = require('body-parser');
const authRoutes = require('./api/routes/auth');

const albumRoutes = require('./api/routes/Album');
const uri = 'mongodb+srv://gabrielcernat666:ArtistDB@artistscluster.ngbijsd.mongodb.net/?retryWrites=true&w=majority&appName=ArtistsCluster';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/api/routes/auth', authRoutes);
app.use('/api/routes/albums', albumsRouter);
app.use('/artists', artistsRouter);
//app.use('/albums', albumsRouter); // Use albums router

app.post('/register', (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Logic to register the user in your database
  // This could involve hashing the password and storing it securely
  // For simplicity, let's just console log the received data
  console.log('Received registration request:', { username, password });

  // Send a response indicating successful registration
  res.status(200).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Find the user in the array (replace this with your database logic)
  const user = users.find(user => user.username === username && user.password === password);

  // Check if user exists and password matches
  if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Send a response indicating successful login
  res.status(200).json({ message: 'Login successful' });
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
