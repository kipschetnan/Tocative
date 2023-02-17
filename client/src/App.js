import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomePage from './pages/home/HomePage';
import Chats from './pages/chats/Chats';
import Messages from './pages/messages/Messages'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ProfilePage from './pages/profile/Profile';
import { io } from 'socket.io-client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

function App() {

  const io = require('socket.io-client')


  var socket = io('http://localhost:3001', { transports: ['websocket'] });
  
  const currentRoom = 'TEST SERVER'
  
  const session = socket.emit('join_room', currentRoom)


  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="App">
        
          <div className='wrapper'>
            <div className='container'>
              

              <Switch>

                <Route exact path='/'>
                  <div className='loginWrapper'>
                    <LoginPage />
                  </div>
                </Route>


                <Route exact path='/login'>
                  <div className='loginWrapper'>
                    <LoginPage />
                  </div>
                </Route>


                <Route path='/register'>
                  <div className='loginWrapper'>
                    <RegisterPage />
                  </div>
                </Route>


                <Route path='/chats'>
                  
                  <div className='loginWrapper'>
                    <Chats />
                  </div>

                </Route>


                <Route path='/messages'>
                  <div>
                    <Messages socket={socket} currentRoom={currentRoom} />
                  </div>
                </Route>


                <Route path ='/profile'>
                  <div className='loginWrapper'>
                    <ProfilePage />
                  </div>
                </Route>


              </Switch>

              
              
            </div>
          </div>

      </div>
    </Router>
    </ApolloProvider>
    
  );
}

export default App;

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },