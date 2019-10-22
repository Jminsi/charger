import React from 'react';
import ChargerListItem from './ChargerListItem';
import { Link } from "react-router-dom";
import styles from './ChargerList.module.css';

export default function ChargerList(props) {


  function updateSearchFilter(event)
  {
    props.onSearchFilterUpdate(event.target.value)
  }


  function logout(event)
  {
    event.preventDefault();    
    props.userLogout();
  }


  return (
    <div>
      { props.userInfo == null ? (
          <div>
            Hello visitor! {' '} <Link to="/login"><button>Login</button></Link>   <Link to="/register"><button>Register</button></Link>      <br/>
            You must login to use chargers. <br/>
            If you do not have account, please register at first.
            </div>
        ) : (
          <div>
            Hello { props.userInfo.full_name } ! <button onClick={logout}>Logout</button> <br/>
            <Link to="/history"><button>Charging history</button></Link>
          </div>      
        )
      }

      <h2>Electric car chargers</h2>
      <div>
        Quick search: <input type="text" onChange={ updateSearchFilter }/> <br/>
        (Type charger city/address or charger name)
      </div>
      <br/>
      <div className={ styles.table }>
        <div className={ styles.tableRow }>
          <div className={ styles.tableCell }> City </div>
          <div className={ styles.tableCell }> Address </div>
          <div className={ styles.tableCell }> Name </div>
          <div className={ styles.tableCell }> Type </div>
          <div className={ styles.tableCell }> Price </div>
          <div className={ styles.tableCell }> Status </div>
          <div className={ styles.tableCell }> </div>
        </div>
      {
        props.items
          .filter(item => 
            item.city.toLowerCase().includes(props.searchFilter.toLowerCase())    || 
            item.address.toLowerCase().includes(props.searchFilter.toLowerCase()) ||
            item.name.toLowerCase().includes(props.searchFilter.toLowerCase())
          ).map(item => <ChargerListItem key={item.id} {...item} />
        )
      }
      </div>    
    </div>
  )
}
