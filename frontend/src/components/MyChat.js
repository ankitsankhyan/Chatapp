import React from 'react'
import {ChatState} from '../context/chatProvider'
import {useState , useEffect} from 'react'
import { useToast} from '@chakra-ui/react';
import axios from 'axios';
const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    // Note this is get function where we did not mentioned type of
    // sending data
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  
  useEffect(()=>{
  // setting the users who is currently logged in
 
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    
    fetchChats();
  },[]);
  
  
  
  return (
    <div>MyChat</div>
  )
}

export default MyChat