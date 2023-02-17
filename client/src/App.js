import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomePage from './pages/home/HomePage';
import Chats from './pages/chats/Chats';
import Messages from './pages/messages/messages'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import ProfilePage from './pages/profile/Profile';
// import { io } from 'socket.io-client';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
})

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


              {/* <Switch> */}
              <Routes>

                <Route path='/login' element={<LoginPage />}/>
                  {/* <div className='loginWrapper'> */}



                {/* <Route exact path='/login'>
                  <div className='loginWrapper'>
                    <LoginPage />
                  </div>
                </Route> */}

                <Route 
                  path='/register'
                  element={<RegisterPage />}/>
                {/* <Route path='/register'>
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
                    <Messages />
                  </div>
                </Route>


                <Route path ='/profile'>
                  <div className='loginWrapper'>
                    <ProfilePage />
                  </div>
                </Route> */}

              </Routes>
              {/* </Switch> */}



            </div>
          </div>

        </div>
      </Router>
    // </ApolloProvider>

  );
}

export default App;

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },