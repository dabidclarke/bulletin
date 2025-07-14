const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const postRoutes = require('./routes/postRoutes');
//const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);
//app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});