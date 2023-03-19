import React from 'react'
import { Container,Box,Text ,Center} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
const HomePage = () => {
  return (
    <Container maxW = 'xl' centerContent>
     <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        centerContent
      >
        <Center fontSize="4xl" fontFamily = "work sans" color="black" centerContent>Talk-A-Live</Center>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
       
        borderRadius="lg"
        borderWidth="1px"
        centerContent
      >
<Tabs variant='soft-rounded' >
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width={"50%"}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
  {/* login in component */}
    </TabPanel>
    <TabPanel>
      {/* sign up */}
    </TabPanel>
  </TabPanels>
</Tabs>

      </Box>

    </Container>
  )
}

export default HomePage