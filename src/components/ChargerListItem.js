import React from 'react';
import { Link } from "react-router-dom";
import styles from './ChargerListItem.module.css';


export default function ChargerListItem(props) {
  return (
      <div className={ styles.tableRow }>
        <div className={ styles.tableCell }> { props.city } </div>
        <div className={ styles.tableCell }> { props.address } </div>
        <div className={ styles.tableCell }> { props.name } </div>
        <div className={ styles.tableCell }> { props.type } </div>
        { props.pricing_mode == "free" ? (
          <div className={ styles.tableCellGreen }> Freee!!!!  </div>
        ) : (
          <div className={ styles.tableCell }> { props.price_cents }   </div>       
        ) }


        <div className={ styles.tableCell }> { props.status }                  </div>
        <div className={ styles.tableCell }>
        { props.status == "free" &&
          <Link to={ `/charger/${props.id}` }> <button>Select</button> </Link>
        }
        </div>
      </div>
  )
}
