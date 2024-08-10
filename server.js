const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const authRoutes = require('./routes/auth');
const lead = require('./routes/lead')
const config = require('./config/db');

const app = express();

// app.use(cors()); // Add this line to enable CORS
app.use(cors({
  origin: true, // This allows requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and other credentials
  optionsSuccessStatus: 204,
}));
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1', lead);

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log("====",err));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
