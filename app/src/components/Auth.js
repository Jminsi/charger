import axios from 'axios';
import constants from '../constants.json';

let userInfo = {
  username: null,
  password: null
}

let myAuth = {
    authenticate: (username, password) => {      
      console.log('authenticate()');
      return new Promise((resolve, reject) => {
        axios.get(constants.baseAddress + '/users/login', 
          {
              auth: {
              username: username,
              password: password
            }
          })
          .then(result => {
            userInfo = {
              username: username,
              password: password
            }
            resolve(result.data.full_name);
          })
          .catch(error => 
            {
              console.log(error);
              reject();
            }
          )
      });
    },

    getAxiosAuth: () => {
      return {
        auth: userInfo
      }
    } 
}

export default myAuth;
