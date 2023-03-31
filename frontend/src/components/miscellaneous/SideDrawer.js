import React, { useState } from "react";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import {ChatState} from '../../context/chatProvider';
import ProfileModal from './ProfileModal'
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingChat, setLoadingChat] = useState();
  const user= ChatState();
  console.log(ProfileModal);
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
          <Button variant="ghost">
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={"4"}>
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
    </>
  );
};

export default SideDrawer;
