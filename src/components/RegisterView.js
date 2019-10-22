import React from 'react'
import { Link } from "react-router-dom";
import styles from './RegisterView.module.css';


export default function RegisterView(props) {


  function register(event)
  {
    event.preventDefault();
    props.registerUser(
      event.target['full_name'].value,
      event.target['login'].value,
      event.target['password'].value
    );
    props.history.goBack();
  }


  return (
    <div>
      <h2>Electric car chargers user register</h2>
      <div>Please enter your full name, login and password</div>
      <br/>
      <form onSubmit={ register }>
        <div className={ styles.tableCell }>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> Full name: </div>
            <div className={ styles.tableCell }> <input type="text" name="full_name" /> </div>
          </div>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> Login: </div>
            <div className={ styles.tableCell }> <input type="text" name="login" /> </div>
          </div>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> Password: </div>
            <div className={ styles.tableCell }> <input type="password" name="password" /> </div>
          </div>
          <div className={ styles.tableRow }>
            <div className={ styles.tableCell }> <br/>  <button type="submit">Register</button> </div>
            <div className={ styles.tableCell }> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
          </div>
        </div>
      </form>
    </div>
  )
}
