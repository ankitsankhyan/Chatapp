import React, { useState } from "react";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import ChatLoading from './chatloading.js';
import {
   useToast,
     Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input
  } from '@chakra-ui/react'
  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {ChatState} from '../../context/chatProvider';
import ProfileModal from './ProfileModal'
import { useDisclosure } from '@chakra-ui/react'
import axios from "axios";



const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingChat, setLoadingChat] = useState();
  const user= ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
   const btnRef = React.useRef()
  const toast = useToast();
   const handleSearch=async()=>{
    console.log('running');
     if(!search){
      toast({
        title: "Please Enter Something in Search!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
     }

     try{
      setLoading(true);
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`,
        }
      
      };
      const {data} = await axios.get(`/api/user/?search=${search}`, config);
      setLoading(false);
      setSearchResult(data)
     }catch(error){

     }
   };

  return (
    <>
    
      <Box display="flex"
       justifyContent="space-between"
       alignItems="center"
       bg="white"
       w="100%"
       p="5px 10px 5px 10px"
       borderWidth='5px'
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick = {onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={"4"} >
              Search Users
            </Text>
          </Button>
        </Tooltip>

        <Text fontFamily="Work sans" as= 'b' fontSize='2xl'>Chat App</Text>
<div>
 <Menu>
    <MenuButton p =  {1}>
    <BellIcon boxSize={6} m = {1}></BellIcon>
    </MenuButton>
 </Menu>
 <Menu>
    {/* if name is absent then text is written */}
 <MenuButton p =  {1}  as = {Button} rightIcon = {<ChevronDownIcon/>}> <Avatar size = 'sm' cursor= 'pointer' name="user.name" src = {user.pic}/></MenuButton>
 <MenuList>
 <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
    <MenuItem>LogOut</MenuItem>
 </MenuList>
 </Menu>
</div>
      </Box>

 
   
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody display={'Flex'}>
            <Input mx={1} placeholder='Type here...' />
            <Button 
            colorScheme='blue'
            onClick={ handleSearch}
            >
              Search
              </Button>
              {Loading?(<ChatLoading/>): (<span>results</span>)}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
           
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  );
};

export default SideDrawer;
