const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors')
 
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());  

app.use(cors())

app.use('/events', eventRoutes); 
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));
