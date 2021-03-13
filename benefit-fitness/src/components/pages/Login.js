import React, {useState} from 'react'
import './Login.css';
import Home from "./Home";
import {Route} from "react-router-dom";
// import {ReactComponent as Logo} from '../images/BenefitLogo1.png'


function LoggedIn ()
{
    const adminUser = {email: "admin@admin.com", password: "admin123"};
    const [user, setUser] = React.useState({email: "", password: ""});
    const [error, setError] =React.useState("");

    const SignIn = details =>
    {
        console.log(details)
        if(details.email === adminUser.email && details.password === adminUser.password)
        {
            console.log("Logged in")
            setUser({
                    email: details.email,
                    password: details.password
                }
            );
        }
        else
        {
            console.log("Details do not match")
        }
    };

    const Logout= () =>
    {
        setUser({ email: "", password: ""})
    };

    return (
        <div className="LoggedIn">
            {(user.email !== "") ?
                (
                    <Home/>
                    // <div className="welcome">
                    //     <h2>Welcome, <span>{user.email}</span></h2>
                    //     <button onClick={Logout}>Logout</button>
                    // </div>
                )
                :
                (
                    <Login SignIn={SignIn} error={error}/>
                )}
        </div>
    )
}

function Login ({SignIn, error})
{



    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = e =>
    {
        e.preventDefault();

        SignIn(details);
    }


    return (
        <>


        <form onSubmit={submitHandler}>
            <div className="div-login">
                <h2>Login</h2>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={e =>
                        setDetails({...details, email: e.target.value})}
                        value={details.email}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e =>
                        setDetails({...details, password: e.target.value})}
                        value={details.password}/>
                </div>
                <input type="submit" value="LOGIN"/>

            </div>

        </form>
            </>


    );
}



export default LoggedIn;