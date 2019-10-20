import React from 'react';
/* import Auth from './Auth'; */
import { Link } from "react-router-dom";


export default function LoginView(props) {


  function login(event)
  {

    event.preventDefault();
/*    props.userInfo: "Jep"*/
/*    Auth.authenticate(event.target['username'].value, event.target['password'].value)
      .then(result =>
        {
          props.loginSuccess();
          props.history.push(props.redirectPathOnSuccess);
        })
      .catch(() => {
        props.loginFail();
      })
      */
    
  }


  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
  }


  return (
    <div>
      <h1>Charger user login</h1>
      <div>Please enter your login and password</div>
      <form onSubmit={ login }>
        <div>
          Login: <input type="text" name="login" />
        </div>
        <div>
          Password: <input type="text" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  )
}
