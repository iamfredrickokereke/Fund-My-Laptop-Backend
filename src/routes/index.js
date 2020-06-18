const passport = require('passport');
const router = require("express").Router();


router.get("/test", (req, res) => res.send("Yeah it works!"));
router.get('/login/twitter', passport.authenticate('twitter'));  
router.get('/logout', (req, res, next) => {   
	req.logout();   
	res.redirect('/'); 
});  
router.get('/return',    passport.authenticate('twitter', { failureRedirect: '/' }),   
	(req, res, next) => {     res.redirect('/'); 
	
}); 
module.exports = router


