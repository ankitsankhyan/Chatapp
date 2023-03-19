import {FormLabel,Input, FormControl, VStack ,InputGroup,Button,InputRightElement} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
const Signup = () => {
    const [show, setshow] = useState('false');
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = ()=>{
        setshow(!show);
    }
    const submitHandler = ()=>{

    }
  return (
   
   <VStack spacing={'5px'}>
    <FormControl id='first-name' isRequired>
        <FormLabel>
            Name
        </FormLabel>
        <Input placeholder = 'Enter your Name'
       onChange = {(e)=>{setName(e.target.value)}} ></Input>
    </FormControl>
    
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

    <FormControl id='first-name' isRequired>
        <FormLabel>
           Confirm Password
        </FormLabel>
        <Input placeholder = 'Confirm Password' type={'password'}
       onChange = {(e)=>{setConfirmPassword(e.target.value)}} ></Input>
    </FormControl>

    <FormControl id='pic'>
        <FormLabel>
          Upload Your Picture
        </FormLabel>
        <Input placeholder = 'Confirm Password' type={'file'}
       onChange = {(e)=>{setConfirmPassword(e.target.value)}} ></Input>
    </FormControl>


    <Button colorScheme={"blue"}
    width="100%"
    marginTop={'15px'}
    onClick={submitHandler}
    >
    Sign Up
    </Button>
   </VStack>
  )
}

export default Signup