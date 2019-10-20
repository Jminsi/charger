import React from 'react';

export default function ChargerView(props) {
  console.log(props)
  const data = props.location.state;

  const chargerData = props.getChargerInfo(parseInt(props.match.params.id));

  return (
    <div>
        <button onClick={() => props.history.goBack()}>Back</button>
            <h1>{ chargerData.location }</h1>
            <h3>{ chargerData.type }</h3>
            <h2>${ chargerData.price_cents }</h2>
            <div>
              <ul>
                {/* chargerData.promos.map((promo, index) => <li key={index}>{promo}</li>) */}
                { chargerData.type }
              </ul>
           </div>
    </div>
  )
}