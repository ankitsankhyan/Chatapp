const express = require('express');
const chats = require('./data/data').chats;
const connectDB = require('./config/db');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, function(err){
    console.log(`server started at ${PORT}`);
})

app.get('/', (req,res)=>{
    res.send('App is running');
})

app.get('/api/chat',(req,res)=>{
    
    res.send(chats);
})