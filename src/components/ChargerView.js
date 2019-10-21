import React from 'react';

export default function ChargerView(props) {
  console.log(props)
  const data = props.location.state;

  const chargerData = props.getChargerInfo(parseInt(props.match.params.id));

  let price_text = "Free";
  if(chargerData.pricing_mode == "min") {
    price_text = (chargerData.price_cents/100) + " e/min"
  } else if(chargerData.pricing_mode == "kwh") {
     price_text = chargerData.price_cents + " c/kWh"
  }

  return (
    <div>
        <button onClick={() => props.history.goBack()}>Back</button>
        <h1>Selected charger: { chargerData.city }, { chargerData.address } / { chargerData.name }</h1>
        <h3>Charger type: { chargerData.type }, { chargerData.power_kw }kW </h3>
        <h3>Price: { price_text }</h3>
    </div>
  )
}
