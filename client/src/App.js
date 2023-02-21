import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomePage from './pages/home/HomePage';
import Chats from './pages/chats/Chats';
import Messages from './pages/messages/messages'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import ProfilePage from './pages/profile/Profile';
import CreateRoom from './pages/createRoom/index';
// import { io } from 'socket.io-client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  // const io = require('socket.io-client')


  // var socket = io('http://localhost:3001', { transports: ['websocket'] });

  // const currentRoom = 'TEST SERVER'

  // const session = socket.emit('join_room', currentRoom)


  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">

          <div className='wrapper'>
            <div className='container'>
              
              <LoginPage />

              <Routes> 

                <Route path='/login' element={<LoginPage />} />

                <Route exact path='/login' element={<LoginPage />} />

                <Route path='/register' element={<RegisterPage />} />

                <Route path='/' element={<Chats />} />

                <Route path='/messages/:convoId' element={<Messages/>}/>

                <Route path='/profile' element={<ProfilePage />} />

                <Route path='/createRoom' element={<CreateRoom />} />

              </Routes>

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