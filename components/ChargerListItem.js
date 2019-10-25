import React from 'react';
import { Link } from "react-router-dom";


export default function ChargerListItem(props) {

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
        { props.pricing_mode === "free" ? (
          <div className="tableCellGreen"> Free </div>
        ) : (
          <div className="tableCell"> { price_text }
          </div>
        ) }

        { (props.status === "Free") ? (
          <div className="tableCellGreen"> Free </div>
        ) : (
          <div className="tableCellRed"> Taken </div>
        ) }

        { /* Add select button only if charger is free and user has login */
          props.status === "Free" &&  props.userFullName != null &&
          <div className="tableCell">
            <Link to={ `/charger/${props.id}` }> <button>Select</button> </Link>
          </div>
        }
      </div>
  )
}
