import React from 'react';
import HistoryListItem from './HistoryListItem';
import { Link } from "react-router-dom";


export default function HistoryList(props) {




//  console.log('hep');
  //let userHistory = 
  //props.getHistory();
//  console.log(userHistory);
  console.log('ffff=' + props.history);

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
          <div className="tableCellBold"> Energy </div>
          <div className="tableCellBold"> Cost </div>
        </div>
      {
/*
        props.history.map((item) => 
        <div className="tableRow">
        <div className="tableCell">{item.time}</div>
        <div className="tableCell"> { props.getChargerInfo(parseInt(item.charger_id)).city }, { props.getChargerInfo(parseInt(item.charger_id)).address }, { props.getChargerInfo(parseInt(item.charger_id)).name } </div>
        <div className="tableCell"> { props.getChargerInfo(parseInt(item.charger_id)).type } { props.getChargerInfo(parseInt(item.charger_id)).power_kw } kW </div>
        <div className="tableCell"> {item.charging_time_secs} sec </div>
        <div className="tableCell"> {item.charged_energy_kwh} kWh </div>
        <div className="tableCell"> {item.cost_cents} c </div>
        </div>
        )
*/
        props.history.map((item) =>
          <HistoryListItem key={item.id} item={item} charger={props.getChargerInfo(parseInt(item.charger_id))} />
        )


      }
      </div>

    </div>    
  )
}
