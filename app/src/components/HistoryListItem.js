import React from 'react';


export default function HistoryListItem(props) {

  return (
    <div className="tableRow">
      <div className="tableCell">{props.item.time}</div>
      <div className="tableCell">{ props.charger.city }, { props.charger.address }, { props.charger.name }</div>
      <div className="tableCell">{ props.charger.type } { props.charger.power_kw } kW</div>
      <div className="tableCell">{props.item.charging_time_secs} sec</div>
      <div className="tableCell">{props.item.charged_energy_kwh} kWh</div>
      <div className="tableCell">{(props.item.cost_cents/100).toFixed(2)} e</div>
    </div>
  )
}
