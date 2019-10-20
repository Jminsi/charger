import React from 'react';
import ChargerListItem from './ChargerListItem';
import { Link } from "react-router-dom";

export default function ChargerList(props) {





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


    <h1>Electric car chargers:</h1>
    <ul>
      {
        props.items.map(item => <ChargerListItem key={item.id} {...item} />)
      }
    </ul>
    
    
    </div>
  )
}
