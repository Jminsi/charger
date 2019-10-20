import React from 'react';
import { Link } from "react-router-dom";

export default function ChargerListItem(props) {
  return (
      <li>
      <Link to={ `/charger/${props.id}` }>
      <div>
{ props.digit } { props.location } { props.type } { props.power_kw } { props.pricing_mode } { props.price_cents } { props.status }
</div>



      </Link>
      </li>
  )
}
