import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterView from './components/RegisterView';
import ChargerList from './components/ChargerList'
import LoginView from './components/LoginView';
import constants from './constants.json';
import './charger.css';


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      chargers: [],
      searchFilter: "",
      userFullName: null,
    }
  }


  /* This called once when app starts, loads chargers to chargers prop */
  componentDidMount = () =>
  {    
    axios.get(constants.baseAddress + '/chargers').then(result => {
      this.setState({ chargers: result.data.chargers });
    })
    .catch(error => {
      console.error(error);
    })

  }


  /* Used for registering user */
  registerUser = (full_name, username, password) => {
    axios.post(constants.baseAddress + '/users/register', {
      full_name: full_name,
      username:  username,
      password:  password
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  /* Called after succesfull user login, saves users full name */
  onLogin = (userFullNameFromApi) => {
    this.setState({ userFullName: userFullNameFromApi });
  }


  /* Called durign logout, clears users full name */
  onLogout = () => {
    this.setState({ userFullName: null });
  }


  /* Updates charger search filter */
  searchFilterUpdate = (newValue) => {
    this.setState({ searchFilter: newValue });
  }


  /* Returns charger info for given charger ID from chargers props */
  getChargerInfo = (chargerId) => {
    return this.state.chargers.find(charger => charger.id === chargerId);
  }


  render()
  {
    return (

      <Router>
        <Route path="/" exact render={
          (routeProps) =>
            <ChargerList
              userFullName ={ this.state.userFullName }
              chargers={ this.state.chargers }
              searchFilter={ this.state.searchFilter }
              onSearchFilterUpdate={ this.searchFilterUpdate }
              userLogout={ this.onLogout }
              {...routeProps}
              />
        } />

        <Route path="/register"    exact render={ routeProps => <RegisterView registerUser={ this.registerUser } {...routeProps} /> }/>

        <Route path="/login"       exact render={ routeProps => <LoginView loginSuccess={ this.onLogin } {...routeProps} /> }/>

      </Router>
    )
  }
}

export default App;
