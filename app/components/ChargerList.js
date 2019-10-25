import React from 'react';
import ChargerListItem from './ChargerListItem';
import { Link } from "react-router-dom";


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


  function openHistory(event)
  {
    event.preventDefault();
    props.getUserHistory();
    props.history.push('/history');
  }


  return (
    <div>
      { props.userFullName == null ? (
          <div>
            Hello visitor! {' '} <Link to="/login"><button>Login</button></Link>   <Link to="/register"><button>Register</button></Link>      <br/>
            You must login to use chargers. <br/>
            If you do not have account, please register at first.
            </div>
        ) : (
          <div>
            Hello { props.userFullName } ! <button onClick={logout}>Logout</button> <br/>
            <button onClick={openHistory}>Show charging history</button> 
          </div>      
        )
      }

      <h2>Electric car chargers</h2>
      <div>
        Quick search: <input type="text" onChange={ updateSearchFilter }/> <br/>
        (Type charger city/address or charger name)
      </div>
      <br/>
      <div className="table">
        <div className="tableRow">
          <div className="tableCellBold"> City </div>
          <div className="tableCellBold"> Address </div>
          <div className="tableCellBold"> Name </div>
          <div className="tableCellBold"> Type </div>
          <div className="tableCellBold"> Price </div>
          <div className="tableCellBold"> Status </div>
          { /* Add last column only if user has login */
            props.userFullName != null &&
              <div className="tableCell"> </div>
          }
        </div>
      {
        props.items
          .filter(item => 
            item.city.toLowerCase().includes(props.searchFilter.toLowerCase())    || 
            item.address.toLowerCase().includes(props.searchFilter.toLowerCase()) ||
            item.name.toLowerCase().includes(props.searchFilter.toLowerCase())
          ).map(item => <ChargerListItem key={item.id} {...item} userFullName={props.userFullName} />
        )
      }
      </div>    
    </div>
  )
}
