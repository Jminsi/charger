import React from 'react';


export default function ChargerListItem(props) {

  //Crete charger price text for table row
  let price_text = "???";
  if(props.pricing_mode === "min") {
    price_text = (props.price_cents/100) + " e/min"
  } else if(props.pricing_mode === "kwh") {
     price_text = props.price_cents + " c/kWh"
  }

  return (
      <div className="tableRow">
        <div className="tableCell"> { props.city } </div>
        <div className="tableCell"> { props.address } </div>
        <div className="tableCell"> { props.name } </div>
        <div className="tableCell"> { props.type } { props.power_kw }kW </div>


        { /* If price mode is free, then show price column in green color with 'Free' text, otherwise show actual price */
          props.pricing_mode === "free" ? (
          <div className="tableCellGreen"> Free </div>
        ) : (
          <div className="tableCell"> { price_text }
          </div>
        ) }


        { /* If Charger is not taken (=free) then show status column in green color, if charger is taken show in red color */
          (props.status === "Free") ? (
          <div className="tableCellGreen"> Free </div>
        ) : (
          <div className="tableCellRed"> Taken </div>
        ) }        


      </div>
  )
}
