import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Toast
  } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useDisclosure, Button,Input } from '@chakra-ui/react'
import { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import UserListItem from '../UserAvatar/UserListItem'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModel = ({children}) => {
  
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
     const {user, chats, selectedChat,setChats} = ChatState();
     const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleGroup = (userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        return;
      }

      
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
    
    const handleDelete = (delUser) => {
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };
  
    const handleSubmit = async()=>{
      if (!groupChatName || !selectedUsers) {
        toast({
          title: "Please fill all the feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  

      
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      console.log(data);
      setChats([data, ...chats]);
      
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    }
    const handleSearch = async(query)=>{
         try{
          if(!query){
            return;
          }
          console.log('searching');
            const config = {
                headers: {
                  Authorization: `Bearer ${user.data.token}`,
                },
              };
        
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            const slicedData = data.slice(0, 4);
            setLoading(false);
             setSearchResult(slicedData);
         }catch(error){
             toast({
            title: "Error Occured!",
            description: "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
           });
         }
         
    }
  return (
    <>
      <Button onClick={onOpen}>Create Group Chat</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <FormControl>
            <Input type='text' onChange = {(e=>{setGroupChatName(e.target.value)})} placeholder='Group name'/> 
            <Input type='text' onChange = {e=>{handleSearch(e.target.value)}} placeholder='Search User'/>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            </FormControl>

            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
            Create Chat!
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModel