import React from 'react';

export default function ChargerView(props) {
  console.log(props)
  const data = props.location.state;

  const chargerData = props.getChargerInfo(parseInt(props.match.params.id));

  return (
    <div>
        <button onClick={() => props.history.goBack()}>Back</button>
        <h1>Selected charger: { chargerData.location } / { chargerData.name }</h1>
        <h3>Type: { chargerData.type } / { chargerData.power_kw }kW </h3>
        <h3>Price: { chargerData.price_cents }</h3>
    </div>
  )
}
