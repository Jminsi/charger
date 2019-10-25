import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from './components/Auth';
import RegisterView from './components/RegisterView';
import ChargerList from './components/ChargerList'
import ChargerView from './components/ChargerView';
import LoginView from './components/LoginView';
import HistoryList from './components/HistoryList'
import constants from './constants.json';
import './charger.css';


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      chargers: [],
      history: [],
      searchFilter: "",
      userFullName: null,
      chargingOngoing: false,
      chargingSecs: 0      
    }
  }


  componentDidMount = () =>
  {    
    //console.log('componentDidMount history=' + this.state.history);
    axios.get(constants.baseAddress + '/chargers').then(result => {
      this.setState({ chargers: result.data.chargers });
      console.log('componentDidMount() chargers:' + result.data.chargers);      
    })
    .catch(error => {
      console.error(error);
    })

  }


  registerUser = (full_name, username, password) => {
    console.log('registerUser(): ' + full_name + ' ' + username + '  ' + password);
    axios.post(constants.baseAddress + '/users/register', {
      full_name: full_name,
      username:  username,
      password:  password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  /* Loads users charging history, user needs to be login/authenticated at first */
  getUserHistory = () => {
    console.log('getUserHistory()')
    axios.get(constants.baseAddress + '/users/history', Auth.getAxiosAuth()).then(results => {
      this.setState({ history: results.data.history });
    })
  }



  /* Called during user login, saves users full name */
  onLogin = (userFullNameFromApi) => {
    console.log('onLogin() userFullNameFromApi=' + userFullNameFromApi);
    this.setState({ userFullName: userFullNameFromApi });
  }


  /* Called durign logout, clears users full name */
  onLogout = () => {
    console.log("onLogout()");
    this.setState({ userFullName: null });
  }


  /* Updates charger search filter */
  searchFilterUpdate = (newValue) => {
    this.setState({ searchFilter: newValue });
  }


  /* Returns charger info for given charger ID */
  getChargerInfo = (chargerId) => {
    return this.state.chargers.find(charger => charger.id === chargerId);
  }


  /* Starts 1 sec interval timer for measuring charging energy and time */
  startTimer = () => {
    /* Timer and rendering explained here: https://www.sitepoint.com/work-with-and-manipulate-state-in-react/ */
    var _this = this
    this.chargerTimer = setInterval(function(){
      _this.setState({chargingSecs: _this.state.chargingSecs + 1})
    }, 1000)
    this.setState({chargingOngoing: true})
  }


  /* Stops interval timer */
  stopTimer = () => {
    clearInterval(this.chargerTimer);
    this.setState({chargingOngoing: false})
  }


  /* Sets charging secs to zero */
  resetChargingSecs = () => {
    this.setState({ chargingSecs: 0 });
  }


  /* Saves charge information  to users history */
  saveChargeToHistory = (chargerId, timeStamp, chargingTimeSecs, chargedEnergyKwh, costCents) => {
    console.log('saveChargeToHistory(): id=' + chargerId + ' ts=' + timeStamp + '  sec=' + chargingTimeSecs + ' kwh=' + chargedEnergyKwh + ' cost=' + costCents );

    axios.post(constants.baseAddress + '/users/savehistory', {
      charger_id: chargerId,
      time: timeStamp,
      charging_time_secs: chargingTimeSecs,
      charged_energy_kwh: chargedEnergyKwh,
      cost_cents: costCents
    },
    Auth.getAxiosAuth()
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render()
  {
    return (

      <Router>
        <Route path="/" exact render={
          (routeProps) =>
            <ChargerList
              userFullName ={ this.state.userFullName }
              items={ this.state.chargers }
              searchFilter={ this.state.searchFilter }
              onSearchFilterUpdate={ this.searchFilterUpdate }
              userLogout={ this.onLogout }
              getUserHistory={ this.getUserHistory }
              {...routeProps}
              />
        } />

        <Route path="/register"    exact render={ routeProps => <RegisterView registerUser={ this.registerUser } {...routeProps} /> }/>
        <Route path="/login"       exact render={ routeProps => <LoginView loginSuccess={ this.onLogin } storeUserInfo={ this.storeUserInfo } {...routeProps} /> }/>
        <Route path="/charger/:id" exact render={ routeProps => <ChargerView {...routeProps} 
          chargingOngoing={this.state.chargingOngoing} 
          chargingSecs={this.state.chargingSecs} 
          getChargerInfo={ this.getChargerInfo } 
          startTimer={this.startTimer}  
          stopTimer={this.stopTimer} 
          resetChargingSecs={this.resetChargingSecs} 
          saveChargeToHistory={this.saveChargeToHistory}  /> } 
        />
        <Route path="/history"     exact render={ (routeProps) => <HistoryList  history={ this.state.history }  getChargerInfo={ this.getChargerInfo }       /> }/>
      </Router>
    )
  }
}

export default App;
