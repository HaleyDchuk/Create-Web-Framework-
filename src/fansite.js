// fansite.js
// Author: Haley Danylchuk 
// create your own fansite using your miniWeb framework



var App = require('./miniWeb.js').App;
var app = new App();


app.get('/', function(req, res) {
	res.sendFile('/homePage.html'); 
});




app.get('/about', function(req, res) {
	res.sendFile('/about/about.html'); 
});
 
app.get('/lizzie-mcguire.jpg', function(req, res) {
	res.sendFile('/lizzie-mcguire.jpg'); 
});

app.get('/css/base.css', function(req, res) {
	res.sendFile('/css/base.css'); 
});

app.get('/home', function(req, res) {
	res.redirect(301, '/'); 
});

app.get('/rando', function(req, res) {
	var randomNum = Math.floor(Math.random() * 3) + 1; 
			if(randomNum === 1){ 
				res.sendFile('image1.jpg'); 
			} else if (randomNum === 2){ 
				res.sendFile('image2.png'); 
			} else { 
				res.sendFile('image3.gif'); 
			}
});





app.listen(8080, '127.0.0.1');

