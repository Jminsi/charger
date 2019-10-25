const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors())

passport.use(new Strategy((username, password, cb) => {
    console.log('passport.use() username=' + username + ' password=' + password);
    if(username == 'test' && password == 'test') {
        cb(null, { id: 123, username: "test", full_name: "The Tester" });
    } else {
        return cb(null, false);
    }
}));


app.get('/users/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
  console.log('apt.get(/users/login req.user.id=' + req.user.id);

  //Send back user full name        
  res.json( { full_name: req.user.full_name } );
});



app.get('/chargers', (req, res) => { 
  console.log('app.get(/chargers');
  res.send({"chargers":[{"id":1,"digit":"AAA1","city":"Oulu","address":"Kasarmintie","name":"Oulun Energian toimitalon piha","type":"Slow","power_kw":25,"pricing_mode":"free","price_cents":0,"status":"Free"},{"id":2,"digit":"AAA2","city":"Oulu","address":"Metsokankaantie 5","name":"K-Citymarket Oulu Kaakkuri","type":"Fast","power_kw":50,"pricing_mode":"kwh","price_cents":11,"status":"Taken"},{"id":3,"digit":"AAA3","city":"Ii","address":"Piisilta 1","name":"Micropolis, parkkipaikka","type":"Slow","power_kw":35,"pricing_mode":"min","price_cents":99,"status":"Free"},{"id":4,"digit":"AAA4","city":"Helsinki","address":"Elielinaukio","name":"P-Eliel","type":"Slow","power_kw":35,"pricing_mode":"min","price_cents":8,"status":"Free"},{"id":5,"digit":"AAA5","city":"Kemi","address":"Tietokatu 1","name":"Kosmos-rakennus","type":"Slow","power_kw":35,"pricing_mode":"min","price_cents":18,"status":"Free"},{"id":6,"digit":"AAA6","city":"Kuopio","address":"Kauppakatu 45","name":"Toriparkki","type":"Slow","power_kw":35,"pricing_mode":"kwh","price_cents":8,"status":"Free"},{"id":7,"digit":"AAA7","city":"Kurikka","address":"Keskuspuistikko","name":"Kurikan Lukio","type":"Slow","power_kw":35,"pricing_mode":"free","price_cents":0,"status":"Free"}]})
});


app.post('/users/register', (req, res) => {
   console.log('/users/register ' + req.body.full_name +' '+ req.body.username +' '+ req.body.password);
   res.sendStatus(201);
});



/* Returns charger info list */
app.get('/users/historyy', (req, res) => { 
  console.log('app.get(/users/historyy');
  res.send({"history":[{"id":1,"user_id":1,"charger_id":1,"time":"2019-12-31 23:00:59","charging_time_secs":500,"charged_energy_kwh":10,"cost_cents":50},{"id":2,"user_id":1,"charger_id":1,"time":"2019-11-30 13:00:59","charging_time_secs":200,"charged_energy_kwh":5,"cost_cents":20}]})
});





/*
app.post('/users', (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  if((typeof username === "string") &&
     (username.length > 4) &&
     (typeof password === "string") &&
     (password.length > 6))
  {
    bcrypt.hash(password, saltRounds).then(hash =>
      db.query('INSERT INTO users (username, password) VALUES (?,?)', [username, hash])
    )
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
  }
  else {
    console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
    res.sendStatus(400);
  }
})
*/

/* DB init */

Promise.all(
  [
/*
      db.query(`CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(32),
          password VARCHAR(256)
  
      ))
      */
      // Add more table create statements if you need more tables
  ]
).then(() => {
  console.log('database initialized');
  app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));
