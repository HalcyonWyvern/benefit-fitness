import React, { Component } from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import {Provider} from "react-redux";
import store from "./store";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth_pages/Register";
import Login from "./components/auth_pages/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/private-route/AdminRoute";

//under components/pages
import Dashboard from "./components/dashboard/Dashboard";
import About from "./components/pages/About";
import Exercises from "./components/pages/Exercises";
import Plans from "./components/pages/Plans";
import UserPlans from "./components/pages/UserPlans";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";

//Admin components
import Admin from "./components/pages/admin_components/pages/AdminDash";
import AdminExercises from "./components/pages/admin_components/pages/AdminExercises";
import AdminPlans from "./components/pages/admin_components/pages/AdminPlans";
import AdminRequests from "./components/pages/admin_components/pages/AdminRequests";


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
                        <Footer />
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
                            <PrivateRoute exact path="/profile" component ={Profile}/>
                            <AdminRoute exact path="/admin" component={Admin}/>
                            <AdminRoute exact path="/admin/exercises" component={AdminExercises}/>
                            <AdminRoute exact path="/admin/requests" component={AdminRequests}/>
                            <AdminRoute exact path="/admin/plans" component={AdminPlans}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;
