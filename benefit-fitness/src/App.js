import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Register from "./components/auth_pages/Register";
import Login from "./components/auth_pages/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

//under components/pages
import Dashboard from "./components/dashboard/Dashboard";
import About from "./components/pages/About";
import Exercises from "./components/pages/Exercises";
import Plans from "./components/pages/Plans";
import UserPlans from "./components/pages/UserPlans";
import Admin from "./components/pages/Admin";
import Contact from "./components/pages/Contact";

// Check for JWT token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/exercises" component={Exercises}/>
                            <PrivateRoute exact path="/plans" component={Plans}/>
                            <PrivateRoute exact path="/userplans" component={UserPlans}/>
                            <PrivateRoute exact path="/about" component={About}/>
                            <PrivateRoute exact path="/contact" component={Contact}/>
                            <PrivateRoute exact path="/admin" component={Admin}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;