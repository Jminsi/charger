import React from 'react';
import Auth from './Auth';
import { Link } from "react-router-dom";


export default function LoginView(props) {


  function login(event)
  {    
    event.preventDefault();    
    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        { /*If login is succesfull, then rResult contains user full name */
          props.loginSuccess(result);
          props.history.push('/');
        })
      .catch(() => {
        console.log('login failed');
        alert("Wrong charger digit, charging not started!");
        props.history.push('/login');
      })    
  }


  return (
    <div>
      <h2>Electric car chargers user login</h2>
      <div>Please enter your username and password</div>
      <br/>
      <form onSubmit={ login }>
        <div className="tableCellNoBorder">
          <div className="tableRow">
            <div className="tableCellNoBorder"> Username: </div>
            <div className="tableCellNoBorder"> <input type="text" name="username" /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder"> Password: </div>
            <div className="tableCellNoBorder"> <input type="password" name="password" /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder"> <br/>  <button type="submit">Login</button> </div>
            <div className="tableCellNoBorder"> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
          </div>
        </div>
      </form>
    </div>
  )
}
