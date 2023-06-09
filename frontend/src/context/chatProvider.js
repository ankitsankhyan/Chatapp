import { createContext, useContext, useEffect, useState } from "react";



const ChatContext = createContext();
const ChatProvider = (({children}) =>{
    const[chats,setChats] = useState([]);
    const [user,setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo){
            // history.push('/');
        }
    },[/*history*/]);
    // whatever we pass to the chatContext then that will be available to all states
    return <ChatContext.Provider value={{user, setUser,selectedChat, setSelectedChat,chats,setChats}}>{children}</ChatContext.Provider>;
})


export const ChatState = () => {
    return useContext(ChatContext);
  };
  
  export default ChatProvider;