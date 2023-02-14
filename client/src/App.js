import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import HomePage from './pages/home/HomePage';
import Chats from './pages/chats/Chats';

function App() {

  return (
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

              </Switch>

              
              
            </div>
          </div>

      </div>
    </Router>
  );
}

export default App;

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },