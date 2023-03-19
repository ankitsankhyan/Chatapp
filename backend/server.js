const express = require('express');
const chats = require('./data/data').chats;
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
dotenv.config();
app.listen(PORT, function(err){
    console.log('server started');
})

app.get('/', (req,res)=>{
    res.send('App is running');
})

app.get('/api/chat',(req,res)=>{
    res.send(chats);
})