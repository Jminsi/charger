import React from 'react';
import HistoryListItem from './HistoryListItem';
import { Link } from "react-router-dom";


export default function HistoryList(props) {

  return (
    <div>
      <Link to="/"><button>Go back</button></Link>
      <h2>{props.userFullName}Your charging history</h2>
      <div className="table">
        <div className="tableRow">
          <div className="tableCellBold"> Date and time </div>
          <div className="tableCellBold"> Charger location </div>
          <div className="tableCellBold"> Charger type </div>
          <div className="tableCellBold"> Charging time </div>
          <div className="tableCellBold"> Energy charged </div>
          <div className="tableCellBold"> Charging cost </div>
        </div>
      {

        props.history.map((item) =>
          <HistoryListItem key={item.id} item={item} charger={props.getChargerInfo(parseInt(item.charger_id))} />
        )


      }
      </div>

    </div>    
  )
}
