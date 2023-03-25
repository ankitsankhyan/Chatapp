const express = require('express');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); //to accept data

app.listen(PORT, function(err){
    console.log(`server started at ${PORT}`);
})

app.get('/', (req,res)=>{
    res.send('App is running');
})

app.use('/api/user', userRoutes);
 
