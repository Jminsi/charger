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
  db.query('SELECT * FROM users WHERE username = ?', [username]).then(dbResults => {

    if(dbResults.length == 0)
    {
      return cb(null, false);
    }
    //console.log('passport.use() username=' + username + ' password=' + password);

    /*
    if(password == dbResults[0].password)) {
      cb(null, { id: dbResults[0].id, username: dbResults[0].username, full_name: dbResults[0].full_name });
    } else {
      return cb(null, false);
    }
    */

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
        //cb(null, dbResults[0]);
        cb(null, { id: dbResults[0].id, username: dbResults[0].username, full_name: dbResults[0].full_name });
      }
      else
      {
        return cb(null, false);
      }
    })



  }).catch(dbError => cb(err))
}));

/* Used for user login and authentication, return users full name */
app.get('/users/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
  console.log('app.get(/users/login req.user.id=' + req.user.id);
  console.log('app.get(/users/login req.user.full_name=' + req.user.full_name);
  console.log('app.get(/users/login req.user.username=' + req.user.username);
  //Send back user full name        
  res.json( { full_name: req.user.full_name } );
});


/* Register a new user
   Expects the following data format
   {
     fullname: string,
     username  string, 
     password: string
    }
*/
app.post('/users/register', (req, res) => {
  console.log('/users/register ' + req.body.full_name +' '+ req.body.username +' '+ req.body.password);

    bcrypt.hash(req.body.password, saltRounds).then(hash =>
      db.query('INSERT INTO users (full_name, username, password) VALUES (?,?,?)', [req.body.full_name, req.body.username, hash])
    )
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));


  /*
  let hash = bcrypt.hashSync(req.body.password, saltRounds);
  db.query('INSERT INTO users(full_name, username, password) VALUES (?,?,?)', [req.body.full_name, req.body.username, req.body.password,])
  .then(results => {
    console.log(results);
    res.sendStatus(201);
  })
  .catch(() => {
    res.sendStatus(500);
  });    
  */

});


/* Returns all chargers info */
app.get('/chargers', (req, res) => { 
  console.log('app.get(/chargers');
  db.query('SELECT * FROM chargers').then(results => {
    res.json({ chargers: results})
  }).catch(() => {
    res.sendStatus(500);
  })
});


/* Returns users charging history */
app.get('/users/history',
  passport.authenticate('basic', { session: false }),
  (req, res) => {

    //db.query('SELECT * FROM users WHERE username = ?', [username]).then(dbResults => 
    db.query('SELECT * FROM history WHERE user_id = ?', req.user.id).then(results => {
      res.json({ history: results})
    }).catch(() => {
      res.sendStatus(500);
    })

  
});


/* Saves users charge history */
app.post('/users/savehistory', 
  passport.authenticate('basic', { session: false }),
  (req, res) => {
  console.log('/users/savehistory uid=' + req.user.id + ' cid=' + req.body.charger_id + 'time=' + req.body.time + ' ctime=' + req.body.charging_time_secs + ' kwh='+ req.body.charged_energy_kwh + ' cost=' + req.body.cost_cents);
  //id | user_id | charger_id | time                | charging_time_secs | charged_energy_kwh | cost_cents
  db.query('INSERT INTO history(user_id, charger_id, time, charging_time_secs, charged_energy_kwh, cost_cents) VALUES (?,?,?,?,?,?)', [req.user.id, req.body.charger_id,
    req.body.time, req.body.charging_time_secs, req.body.charged_energy_kwh, req.body.cost_cents])
  .then(results => {
    //console.log(results);
    res.sendStatus(201);
  })
  .catch(() => {
    res.sendStatus(500);
  });    
});


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
