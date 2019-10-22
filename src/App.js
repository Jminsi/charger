import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchView from './components/SearchView';
import RegisterView from './components/RegisterView';
import ProductView from './components/ProductView';
import ProfileView from './components/ProfileView'
import ChargerList from './components/ChargerList'
import ChargerView from './components/ChargerView';
import LoginView from './components/LoginView';
import data from './chargers.json'
import constants from './constants.json';


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
/*      items: data.chargers, */
      chargers: data.chargers,
      searchFilter: "",
      listMode: "grid",
      userInfo: null
    }
  }

/*
  toggleResultPresentationMode = () => {
    this.setState( { listMode: this.state.listMode == "list" ? "grid" : "list" } )
  }
*/

/*
  getProductInfo = (productId) => {
    return this.state.items.find(item => item.id === productId);
  }
*/





  componentDidMount = () =>
  {    
    axios.get(constants.baseAddress + '/chargers').then(result => {
      this.setState({ chargers: result.data.chargers });
    })
    .catch(error => {
      console.error(error);
    })
  }


  registerUser = (full_name, login, password) => {
    console.log('reg: ' + full_name + ' ' + login + '  ' + password);
    axios.post(constants.baseAddress + '/users', {
      full_name: full_name,
      login:     login,
      password:  password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }




  onLogin = () => {
    console.log("onLogin");
    this.setState({ userInfo: {
      id: 1,
      login: "test",
      password: "test",
      full_name: "Test Tester"}});
  }


  onLogout = () => {
    console.log("onLogout");
    this.setState({ userInfo: null });
  }


  searchFilterUpdate = (newValue) => {
    this.setState({ searchFilter: newValue });
  }


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
              items={ this.state.chargers }
              userInfo={ this.state.userInfo }
              searchFilter={ this.state.searchFilter }
              onSearchFilterUpdate={ this.searchFilterUpdate }
              userLogout={ this.onLogout }
              />
        } />

        <Route path="/login" exact render={ routeProps => <LoginView loginSuccess={ this.onLogin } storeUserInfo={ this.storeUserInfo } {...routeProps} /> }/>
        <Route path="/charger/:id" exact render={ routeProps => <ChargerView {...routeProps} getChargerInfo={ this.getChargerInfo } /> } />









        <Route path="/ff" exact render={
          (routeProps) =>
            <SearchView
              items={ this.state.items }
              searchFilter={ this.state.searchFilter }
              onSearchFilterUpdate={ this.searchFilterUpdate }
              toggleResultPresentationMode={ this.toggleResultPresentationMode }
              presentationMode={ this.state.listMode }
              userInfo={ this.state.userInfo }
              userLogout={ this.onLogout }
              />
        } />
        <Route path="/register" exact render={ routeProps => <RegisterView registerUser={ this.registerUser } {...routeProps} /> }/>
        <Route path="/profile" exact render={ routeProps => <ProfileView userInfo={ this.state.userInfo } {...routeProps} /> }/>
        <Route path="/product/:id" exact render={ routeProps => <ProductView {...routeProps} getProductInfo={ this.getProductInfo } /> } />
      </Router>
    )
  }
}

export default App;