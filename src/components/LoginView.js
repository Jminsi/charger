import React from 'react';
/* import Auth from './Auth'; */
import { Link } from "react-router-dom";
import styles from './LoginView.module.css';


export default function LoginView(props) {


  function login(event)
  {

    event.preventDefault();
    console.log("calling props.loginSuccess();");
    props.loginSuccess();
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

    props.history.push('/');
  }


  function cancel(event)
  {
    event.preventDefault();
    props.history.goBack();
  }

  const divLeft = {
    float: 'left',
    border: '1px solid black'
  }

  return (
    <div>
      <h2>Electric car chargers user login</h2>
      <div>Please enter your login and password</div>
      <br/>
      <form onSubmit={ login }>
        <div className={ styles.tableCell }>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> Login: </div>
            <div className={ styles.tableCell }> <input type="text" name="login" /> </div>
          </div>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> Password: </div>
            <div className={ styles.tableCell }> <input type="password" name="password" /> </div>
          </div>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> <br/>  <button type="submit">Login</button> </div>
            <div className={ styles.tableCell }> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
          </div>
        </div>
      </form>
    </div>
  )
}
