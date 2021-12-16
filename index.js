const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const siteRoutes = require('./routes/site');
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/site', siteRoutes);

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
).then(() => {
    console.log("Connected to mongodb atlas")
}).catch(error => {
    console.log("Failed to connect", error);
})

app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
})
