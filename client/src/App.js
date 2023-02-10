import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Login from '../src/pages/login/Login'

function App() {
  return (
    <Router>
        <div className="App">
          <div className='wrapper'>
            <div className='container'>
              <Switch>
                <Route exact path='/'>
                  <Login />
                </Route>

                <Route path='/'>
                  <Login />
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