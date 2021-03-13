import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/pages/Home';
import Navbar2 from "./components/Navbar2";
import Login from "./components/pages/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar2 />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path={'/home'} exact component={Home}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
