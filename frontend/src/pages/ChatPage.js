import React, { useContext, useEffect,useState } from 'react';

import {ChatState} from '../context/chatProvider'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChat from '../components/MyChat';
import Chatbox from '../components/miscellaneous/Chatbox';
const ChatPage = () => {
  console.log('working');
   const {user} = ChatState();
  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent='space-between'
     
      w='100%'
      h='91.5vh'
      p='10px'
     
      >
     {user && <MyChat/>}
     {user && <Chatbox/>}
       
      </Box>
     
    </div>
  )
}


export default ChatPage;