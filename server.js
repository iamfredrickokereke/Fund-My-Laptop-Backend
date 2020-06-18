
require('dotenv').config();
// require('express-async-errors')
const http = require('http');
require('express-async-errors')
const express = require('express');
const path = require("path")
const passport = require('passport'); 
const { Strategy } = require('passport-twitter'); 
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, SESSION_SECRET } =  process.env;
const app = express();


const preMiddlewares = require('./src/middlewares/preMiddlewares');
const errorMiddlewares = require('./src/middlewares/errorMiddlewares');
const routes = require('./src/routes');
const databaseConfig = require('./src/config/db');
const port = process.env.PORT || 2020;

preMiddlewares(app);
passport.use(new Strategy({  
   consumerKey: TWITTER_CONSUMER_KEY, 
   consumerSecret: TWITTER_CONSUMER_SECRET, 
   callbackURL: 'https://www.fundmylaptop.com/' 
},   
(accessToken, refreshToken, profile, cb) => {     
	return cb(null, profile); }));  
	
passport.serializeUser((user, cb) => {   
	cb(null, user); 
});  
	
passport.deserializeUser((obj, cb) => {   
	cb(null, obj); 
}); 

app.use(require('express-session')({ 
	secret: SESSION_SECRET, resave: true, saveUninitialized: true })); 

app.use(passport.initialize()); 

app.use(passport.session());

app.use('/api', routes)

// Web routes
app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname+'/public/index.html'));
})

errorMiddlewares(app)

app.listen(port, () => {
  console.log(`::: server listening on port ${port}. Open via http://localhost:${port}/`);
  databaseConfig()
});

app.on('error', (error) => {
  console.log(`::> an error occiurred in our server: \n ${error}`);
});
