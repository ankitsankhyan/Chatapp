import React, { useState } from "react";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { spinner } from "@chakra-ui/spinner";
import ChatLoading from "./chatloading.js";
import {
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/chatProvider";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/react";
import UserListItem from "../UserAvatar/UserListItem.js";
import axios from "axios";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { setSelectedChat, user, chats, setChats, selectedChat } = ChatState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
  const searchquery = (query) => {
    setSearch(query);
  };
  //
  const handleSearch = async () => {
    console.log(user, "from handleSearch");
    if (!search) {
      toast({
        title: "Please Enter Something in Search!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      //  console.log(user.data.token);
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      console.log(search);
      const { data } = await axios.get(`/api/user/?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Could not retrive data",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    console.log(user);

    try {
      setLoadingChat(true);
      // on sending data post content type must be specified
      console.log(user,'it is actual token of user');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      // requenst to make chat in API and chat which is created will be sent in data

      const { data } = await axios.post(`/api/chat`, { userId }, config);
      console.log(data);
      // chats is the total chats that user has made and data is new created chat with selected user
      // if chat does not exist between both user then we will add the chat
     if(chats){
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
     }
       
      

      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={"4"}>
              Search Users
            </Text>
          </Button>
        </Tooltip>

        <Text fontFamily="Work sans" as="b" fontSize="2xl">
          Chat App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon boxSize={6} m={1}></BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            {/* if name is absent then text is written */}
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              {" "}
              <Avatar
                size="sm"
                cursor="pointer"
                name="user.name"
                src={user.data.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user.data}>
              <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              
              
              <MenuItem>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" p={1}>
              <Input
                mx={1}
                placeholder="Type here..."
                onChange={(e) => {
                  searchquery(e.target.value);
                }}
              />
              <Button colorScheme="blue" onClick={handleSearch}>
                Search
              </Button>
            </Box>
            {Loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
          {/* this is the spinner which is going to be working till chat is loaded */}
          {loadingChat && <spinner ml="auto" display="flex" />}
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
