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

    bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
      if(bcryptResult == true)
      {
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
    bcrypt.hash(req.body.password, saltRounds).then(hash =>
      db.query('INSERT INTO users (full_name, username, password) VALUES (?,?,?)', [req.body.full_name, req.body.username, hash])
    )
    .then(dbResults => {
        res.sendStatus(201);
    })
    .catch(error => res.sendStatus(500));
});


/* Returns all chargers info */
app.get('/chargers', (req, res) => { 
  db.query('SELECT * FROM chargers').then(results => {
    res.json({ chargers: results})
  }).catch(() => {
    res.sendStatus(500);
  })
});


/* DB init */
Promise.all(
  [
      // Add more table create statements if you need more tables

        db.query(`CREATE TABLE IF NOT EXISTS users (
          id int(11) NOT NULL AUTO_INCREMENT,
          username varchar(45) DEFAULT NULL,
          password varchar(128) DEFAULT NULL,
          full_name varchar(45) DEFAULT NULL,
          PRIMARY KEY (id))`),

        db.query(`CREATE TABLE IF NOT EXISTS chargers (
          id int(11) NOT NULL AUTO_INCREMENT,
          digit varchar(45) DEFAULT NULL,
          city varchar(45) DEFAULT NULL,
          address varchar(45) DEFAULT NULL,
          name varchar(45) DEFAULT NULL,
          type enum('Slow','Fast') DEFAULT NULL,
          power_kw int(11) DEFAULT NULL,
          pricing_mode enum('free','min','kwh') DEFAULT NULL,
          price_cents int(11) DEFAULT NULL,
          status enum('Free','Taken') DEFAULT NULL,
          PRIMARY KEY (id))`),
          
        db.query(`INSERT IGNORE INTO chargers VALUES (1,'AAA1','Oulu','Kasarmintie','Oulun Energian toimitalon piha','Slow',25,'free',0,'Free'),(2,'AAA2','Oulu','Metsokankaantie 5','K-Citymarket Oulu Kaakkuri','Fast',50,'kwh',11,'Taken'),(3,'AAA3','Ii','Piisilta 1','Micropolis, parkkipaikka','Slow',35,'min',99,'Free'),(4,'AAA4','Helsinki','Elielinaukio','P-Eliel','Slow',35,'min',8,'Free'),(5,'AAA5','Kemi','Tietokatu 1','Kosmos-rakennus','Slow',35,'min',18,'Free'),(6,'AAA6','Kuopio','Kauppakatu 45','Toriparkki','Slow',35,'kwh',8,'Free'),(7,'AAA7','Kurikka','Keskuspuistikko','Kurikan Lukio','Slow',35,'free',0,'Free'),(8,'ASC3','Eurajoki','Kirkkotie 3','Osuuspankin piha-alue','Slow',22,'min',20,'Free'),(9,'GE3F','Imatra','Tiedonkatu 2','ABC Imatra','Fast',135,'kwh',28,'Free'),(10,'BD3X','Joensuu','Torikatu 16','Hotel Greenstar parkkihalli','Slow',22,'free',0,'Free'),(11,'BDZ1','Kokkola','Talonpojankatu 2','KEBA KeContact P20','Fast',120,'kwh',80,'Taken'),(12,'JEC5','Lahti','Kiitokatu 2','ABC Kivimaa','Slow',22,'min',10,'Free'),(13,'KHV6','Oulu','Kiviharjuntie 5','Technopolis Sairaalaparkki Parkkihalli','Fast',60,'kwh',18,'Free'),(14,'IXS3','Oulu','Nuottasaarentie 1','ABC Prisma Limingantulli','Slow',22,'min',15,'Free'),(15,'V6HB','Raisio','Nesteentie 36','Hiabin toimipiste','Fast',75,'free',0,'Free'),(16,'BS4X','Rovaniemi','Koskikatu 25','Kauppakeskus Rinteenkulma','Slow',22,'min',20,'Taken'),(17,'PO8V','Turku','Linnankatu 65','Turku Energian toimitalo','Fast',50,'kwh',25,'Free'),(18,'UIC3','Vantaa','Kiitoradantie 2','Volkswagen Center Airport','Slow',22,'min',8,'Free'),(19,'QWX3','Ylivieska','Vierimaantie 7','Centrian parkkipaikka','Fast',80,'kwh',20,'Taken'),(20,'MND4','Nokia','Kerhokatu 10','Nokian voimalaitoksen latausasema','Slow',22,'min',15,'Free'),(21,'NSS2','Muonio','Harrinivantie 28','Harrinivan lomakeskus','Slow',22,'free',0,'Free');`)
  ]
).then(() => {
  console.log('database initialized');
  app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
  });
})
.catch(error => console.log(error));
