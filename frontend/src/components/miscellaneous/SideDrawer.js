import React, { useState } from "react";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingChat, setLoadingChat] = useState();

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
      </Box>
    </>
  );
};

export default SideDrawer;
