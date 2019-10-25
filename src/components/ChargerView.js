import React from 'react';
import { Link } from "react-router-dom";


export default function ChargerView(props) {
  
  const chargerData = props.getChargerInfo(parseInt(props.match.params.id));


  /* Just counter to simulate charged energy according elapsed time (we do not have actual charger where to measure) */
  let charged_energy_kw = (props.chargingSecs * 0.3).toFixed(0);

  /* Create price text charger info, depends from pricing mode */
  let price_text = "Free";
  if(chargerData.pricing_mode == "min") {
    price_text = (chargerData.price_cents/100) + " e/min"
  } else if(chargerData.pricing_mode == "kwh") {
     price_text = chargerData.price_cents + " c/kWh"
  }


  let cost_text = 0;
  if(chargerData.pricing_mode == "min") {
    cost_text = ((chargerData.price_cents * (props.chargingSecs/60))/100).toFixed(2)  + " e"
  } else if(chargerData.pricing_mode == "kwh") {
     cost_text = (chargerData.price_cents * charged_energy_kw) + " c"
  }




  function startCharging(event)
  {    
    event.preventDefault();
    props.startTimer();
  }

  function stopCharging(event)
  {    
    event.preventDefault();
    props.stopTimer();
   //TODO ZERO does not work, add also reset when using back button
    cost_text = 0;
  }


  


  return (
    <div>
      <button onClick={() => props.history.goBack()}>Back</button>
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
           <div className="tableCell">  { price_text } </div>
        </div>
      </div>



      <br/>
      To start charging, please see four digits code from the charging station and <br/>enter it to field below, then click "Start charging" button.
      <form onSubmit={ startCharging }>
        <div className="tableCellNoBorder">
          <div className="tableRow">
            <div className="tableCellNoBorder"> Charger four digits: </div>
            <div className="tableCellNoBorder"> <input type="text" name="digit" /> </div>
          </div>
          
          <div className="tableRow">
            <div className="tableCellNoBorder"> <br/>  <button type="submit">Start charging</button> </div>
            <div className="tableCellNoBorder"> <br/>  <Link to="/"><button>Cancel</button></Link> </div>
          </div>
        </div>
      </form>

      <br/>
      Charging process info:
      <div className="table">
        <div className="tableRow">
          <div className="tableCellBold"> Charging time: </div>
          <div className="tableCell"> { props.chargingSecs } sec </div>
        </div>
        <div className="tableRow">
          <div className="tableCellBold"> Charged energy: </div>
           <div className="tableCell"> { charged_energy_kw  } kWh </div>
        </div>
        <div className="tableRow">
          <div className="tableCellBold"> Cost: </div>
           <div className="tableCell"> { cost_text } </div>
        </div>
      </div>



<button onClick={startCharging}>Start</button> 
<button onClick={stopCharging}>Stop</button> 
      
    </div>
  )
}
