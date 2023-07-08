import React, { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import { Box,Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton,Spacer } from '@chakra-ui/react';
import ProfileModal from './ProfileModal';
import { getSenderFull,getSender } from '../../config/ChatLogics';
import UpdateGroupChatModal from './UpdateGroupChatModel';

function SingleChat({setFetchAgain,fetchAgain}) {
   const {user,selectedChat, setSelectedChat} = ChatState();

   
  return (
    <>
      {selectedChat?(
      <>
      
      <Text 
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            flexDir="row"

            justifyContent={ "space-between"}
          
         
          >
            <IconButton
             
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("") }/>
              {
              (!selectedChat.isGroupChat ? (
                <>
               <Text> hello  {getSender(user.data, selectedChat.users)}</Text>
                
                  <ProfileModal
                    user={getSenderFull(user.data, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                   style={{backgroundColor: "blue"}}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
                </Text>
                <Box
                d="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY = 'hidden'
              >
               
                
                {/* Messages go here */}
              </Box>
           
</>
                
                )
                   
              :( 
      <Box d="flex" alignItems="center" justifyContent="center" h="100%">
         
         
         <Text  fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start chatting
          </Text>
                     
        </Box>   )}
    </>
  )
}

export default SingleChat
