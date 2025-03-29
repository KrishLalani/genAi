// app.js
const express = require('express');
require('dotenv').config();
const queryRoutes = require('./routes/queryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', queryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
