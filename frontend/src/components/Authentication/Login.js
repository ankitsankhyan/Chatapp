import React from 'react'
import {FormLabel,Input, FormControl, VStack ,InputGroup,Button,InputRightElement} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setshow] = useState('false');
    var toast = useToast();
    const handleClick = ()=>{
        setshow(!show);
    }
    const submitHandler =async ()=>{
      if (!email || !password ) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        }
  
        var data = await axios.post("/api/user/login", {
          email,password
        }, config);
      }catch(e){
          console.log(e.response.data);
      }
     
console.log(data);
     

      if(data){

        toast({
          title: "Successfully Login",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        


      }else{
        toast({
          title: "Error occured",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      return;
      }
  return (
    <VStack>
    
    
    <FormControl id='first-name' isRequired>
        <FormLabel>
          Email
        </FormLabel>
        <Input placeholder = 'Enter your Email'
       onChange = {(e)=>{setEmail(e.target.value)}} ></Input>
    </FormControl>

    <FormControl id='first-name' isRequired >
        <FormLabel>
           Password
        </FormLabel>
        <InputGroup>
        <Input placeholder = 'Password' type={!show?"password":"text"}
       onChange = {(e)=>{setPassword(e.target.value)}} ></Input>
       
       <InputRightElement width="4.5rem">
       <Button h='1.75' size='sm' onClick={handleClick}>
         {show?"Hide":"show"}
       </Button>
       </InputRightElement></InputGroup>
        
    </FormControl>

    <Button colorScheme={"blue"}
    width="100%"
    marginTop={'15px'}
    onClick={submitHandler}
    >
     Login
    </Button>
    </VStack>
  )
}

export default Login