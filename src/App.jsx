import './App.css';
import LoginApiCall from './pages/LoginApiCall';
import Product from './pages/Product';
import SignupApiCall from './pages/SignupApiCall';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/'>
          <SignupApiCall></SignupApiCall>
        </Route>
        <Route path='/loginPage'>
          <LoginApiCall></LoginApiCall>
        </Route>
        <Product></Product>
        <Route path='/product'>
          
        </Route>
      </Switch>
    </Router>

    

  );
}

export default App;
