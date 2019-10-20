import React from 'react';
import ChargerListItem from './ChargerListItem';
import { Link } from "react-router-dom";
import styles from './ChargerList.module.css';

export default function ChargerList(props) {


  function updateSearchFilter(event)
  {
    props.onSearchFilterUpdate(event.target.value)
  }



  return (
    <div>
        { props.userInfo == null ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
        <div>
          <Link to="/history">
            <button>Show charging history</button>
          </Link>
          <Link to="/history">
            <button>Logout</button>
          </Link>
       </div>      
        ) }

      <h2>Electric car chargers</h2>
      <div>
        Quick search: <input type="text" onChange={ updateSearchFilter }/>
       <br/>
        (Type charger city/address or charger name)
      </div>
      <br/>
    <div className={ styles.table }>
      <div className={ styles.tableRow }>
        <div className={ styles.tableCell }> City </div>
        <div className={ styles.tableCell }> Address </div>
        <div className={ styles.tableCell }> Name     </div>
        <div className={ styles.tableCell }> Type     </div>
        <div className={ styles.tableCell }> Price    </div>
        <div className={ styles.tableCell }> Status   </div>
        <div className={ styles.tableCell }>    </div>
      </div>
      {/* 
        props.items.map(item => <ChargerListItem key={item.id} {...item} />)
      */}
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
