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
				res.sendFile('/rando/image1.jpg'); 
			} else if (randomNum === 2){ 
				res.sendFile('/rando/image2.png'); 
			} else { 
				res.sendFile('/rando/image3.gif'); 
			}
});





app.listen(8080, '127.0.0.1');

// if(req.path === '/'){ 
// 			res.sendFile('/homePage.html'); 
// 		} else if(req.path === '/about' || req.path === '/about/'){ 
// 			res.sendFile('/about/about.html'); 
// 		} else if (req.path === '/lizzie-mcguire.jpg'){ 
// 			res.sendFile('/lizzie-mcguire.jpg'); 
// 		} else if(req.path === '/css/base.css'){ 
// 			res.sendFile('/css/base.css'); 
// 		} else if(req.path === '/rando' || req.path === '/rando/' ){ 
// 			var randomNum = Math.floor(Math.random() * 3) + 1; 
// 			if(randomNum === 1){ 
// 				res.sendFile('/rando/image1.jpg'); 
// 			} else if (randomNum === 2){ 
// 				res.sendFile('/rando/image2.png'); 
// 			} else { 
// 				res.sendFile('/rando/image3.gif'); 
// 			}
// 		}


// 		else { 
// 			res.setHeader('Content-Type', 'text/plain'); 
// 			res.send(404, res.codeObject[404]); 
// 		}