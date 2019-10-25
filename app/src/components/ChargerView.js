import React from 'react';
//import { Link } from "react-router-dom";


export default function ChargerView(props) {
  
  const chargerData = props.getChargerInfo(parseInt(props.match.params.id));

  /* Create price text for charger info, depends from pricing mode */
  let priceText = "Free";
  if(chargerData.pricing_mode === "min") {
    priceText = (chargerData.price_cents/100) + " e/min"
  } else if(chargerData.pricing_mode === "kwh") {
     priceText = chargerData.price_cents + " c/kWh"
  }


  /* Calculate current charging energy amount. Because we do not have actual charger where to measure, we just use 0.3 multiplier to simulate charging. */
  let chargedEnergyKw = (props.chargingSecs * 0.3).toFixed(0);


  /* Calculate current charging costs in cents */
  let chargedCostCents = 0;
  if(chargerData.pricing_mode === "min") {
    chargedCostCents = ( (chargerData.price_cents/60) * props.chargingSecs).toFixed(0)
  } else if(chargerData.pricing_mode === "kwh") {
     chargedCostCents = (chargerData.price_cents * chargedEnergyKw)
  }


  /* Starts charging if charger digit code is correct */
  function startCharging(event) {    
    event.preventDefault();
    props.resetChargingSecs();
    if(event.target['digit'].value === chargerData.digit) {
      props.startTimer();
    } else {
      alert("Wrong charger digit, charging not started!");
    }
  }


  /* Stops charging and saves charging to user history */
  function stopCharging(event) {    
    event.preventDefault();
    props.stopTimer();
    let d = new Date();
    props.saveChargeToHistory(chargerData.id, d.toLocaleString('en-GB'), props.chargingSecs, chargedEnergyKw, chargedCostCents);
  }


  /* If user press "Back" button and there is still charging ongoing then stops charging and saves chaging to user history */
  function goBack(event) {
    event.preventDefault();
    if(props.chargingOngoing === true) {
       props.stopTimer();
       let d = new Date();
       props.saveChargeToHistory(chargerData.id, d.toLocaleString('en-GB'), props.chargingSecs, chargedEnergyKw, chargedCostCents);
    }
    props.resetChargingSecs();
    props.history.push('/')
  }


  return (
    <div>
      <button onClick={ goBack }>Back</button>
      <h2>Charging operation</h2>
      Selected charger info:
      <div className="table">
        <div className="tableRow">
          <div className="tableCellBold"> Charger: </div>
          <div className="tableCell"> { chargerData.city }, { chargerData.address }, { chargerData.name } </div>
        </div>
        <div className="tableRow">
          <div className="tableCellBold"> Type: </div>
           <div className="tableCell"> { chargerData.type }, { chargerData.power_kw }kW </div>
        </div>
        <div className="tableRow">
          <div className="tableCellBold"> Price: </div>
           <div className="tableCell">  { priceText } </div>
        </div>
      </div>

      <br/>
      To start charging, please see four digits code from the charging station and <br/>enter it to field below, then click "Start charging" button.<br/>
      When charging is done, click "Stop charging" button. <br/>
      Also pressing "Back" button will stop charging.
      <form onSubmit={ startCharging }>
        <div className="tableCellNoBorder">
          <div className="tableRow">
            <div className="tableCellNoBorder"> Charger four digits: </div>
            <div className="tableCellNoBorder"> <input type="text" name="digit" readOnly={props.chargingOngoing} /> </div>
          </div>
          <div className="tableRow">
            <div className="tableCellNoBorder">  </div>
            <div className="tableCellNoBorder"> (NOTE! In real life you see digits: {chargerData.digit} in real charger. Enter these digits to field above.) </div>
          </div>         
          <div className="tableRow">
            <div className="tableCellNoBorder"> <br/>            
              { props.chargingOngoing === false ? (
                <button type="submit">Start charging</button>
              ) : (
                <button onClick={stopCharging}>Stop charging</button> 
              )}            
            </div>                      
            <div className="tableCellNoBorder">  </div>
          </div>
        </div>
      </form>

      <br/>

      { (props.chargingOngoing === true || props.chargingSecs > 0)  &&
        <div>
        Charging process info:
        <div className="table">
          <div className="tableRow">
            <div className="tableCellBold"> Charging time: </div>
            <div className="tableCell"> { props.chargingSecs } sec </div>
          </div>
          <div className="tableRow">
            <div className="tableCellBold"> Charged energy: </div>
             <div className="tableCell"> { chargedEnergyKw  } kWh </div>
          </div>
          <div className="tableRow">
            <div className="tableCellBold"> Cost: </div>
             <div className="tableCell"> { (chargedCostCents/100).toFixed(2) } e </div>
          </div>
        </div>
        </div>
      }
     
    </div>
  )
}
