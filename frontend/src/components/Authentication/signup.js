import {
  FormLabel,
  Input,
  FormControl,
  VStack,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {

  const [show, setshow] = useState("false");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  // const history = useHistory();
  const handleClick = () => {
    setshow(!show);
  };
  const postDetails = (pics) => {
    console.log(pics);
    setPic(pics);
  
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "djpfisxot");
      fetch("http://api.cloudinary.com/v1_1/djpfisxot/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        
      });
      setPicLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      // config must be send in this manner only
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
    
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };
    
  
  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Password"
            type={!show ? "password" : "text"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>

          <InputRightElement width="4.5rem">
            <Button h="1.75" size="sm" onClick={handleClick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          placeholder="Confirm Password"
          type={"password"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></Input>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type={"file"}
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        ></Input>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        marginTop={"15px"}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
