import React from 'react';
import { Link } from "react-router-dom";
import styles from './ChargerListItem.module.css';


export default function ChargerListItem(props) {

  let price_text = "???";
  if(props.pricing_mode == "min") {
    price_text = (props.price_cents/100) + " e/min"
  } else if(props.pricing_mode == "kwh") {
     price_text = props.price_cents + " c/kWh"
  }

  return (
      <div className={ styles.tableRow }>
        <div className={ styles.tableCell }> { props.city } </div>
        <div className={ styles.tableCell }> { props.address } </div>
        <div className={ styles.tableCell }> { props.name } </div>
        <div className={ styles.tableCell }> { props.type } { props.power_kw }kW </div>
        { props.pricing_mode == "free" ? (
          <div className={ styles.tableCellGreen }> Free </div>
        ) : (
          <div className={ styles.tableCell }> { price_text }
          </div>
        ) }

        { props.status == "Free" ? (
          <div className={ styles.tableCellGreen }> Free </div>
        ) : (
          <div className={ styles.tableCellRed }> Taken </div>
        ) }

        { props.status == "Free" ? (
          <div className={ styles.tableCell }>
            <Link to={ `/charger/${props.id}` }> <button>Select</button> </Link>
          </div>
        ) : (
          <div className={ styles.tableCell }>
          </div>
        ) }
      </div>
  )
}
