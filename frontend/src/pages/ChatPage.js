import React, { useEffect,useState } from 'react';
import axios from 'axios';
const ChatPage = () => {
    const [chat,setchat] = useState([]);
    const fetchChats = async () =>{
        const data = await axios.get("/api/chat");
       
        setchat(data.data);

      
       
    }

    console.log(chat, 'chat');
    useEffect(()=>{
        console.log('running')
        fetchChats();
    },[])
  return (
    <div>ChatPage
       {chat.map((chat)=>{return <div key={chat._id}>
                 {chat.chatName}
                 </div>})}
    </div>
  )
}

export default ChatPage