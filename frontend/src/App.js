import { Route } from 'react-router-dom';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
function App() {
  return (
    <div className="App">
    <Route exact path = "/api/chat" component={ChatPage}/>
    <Route exact path = "/" component={HomePage}/>
    
    </div>
  );
}

export default App;
