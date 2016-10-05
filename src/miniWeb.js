// miniWeb.js
// Author: Haley Danylchuk 
// define your Request, Response and App objects here





module.exports = { 
	Request: Request,
	Response: Response, 
	App: App
	
}

//CONSTRUCTING REQUEST OBJECT 
function Request(s){ 
	var requestParts = s.split(' '); 

	var path = requestParts[1]; 
	this.path = path; 
	var method = requestParts[0]; 
	this.method = method; 


	//THIS IS ALL FOR GETTING THE HEADERS 
	var gettingHeaders = s.split('\r\n'); 

	var x; 
	var headerArray = []; 
	for(x = 1; x < gettingHeaders.length-1; x++){ 
		
		var currentHeader = gettingHeaders[x]; 
		//console.log(currentHeader); 
		if(currentHeader !== ''){
			headerArray.push(currentHeader); 
		} else { 
			break; 
		}
	}




	var keysAndValues = []; 
	var i; 
	for(i = 0; i < headerArray.length; i ++){ 
		var thisHeader = headerArray[i]; 
		var splitHeader = thisHeader.split(' '); 
		
		var m; 
		for(m = 0; m< splitHeader.length; m++){ 
			keysAndValues.push(splitHeader[m]); 
			
		}

	}

	var stringKeys = []; 
	var keys = []; 
	var t; 
	for(t = 0; t < keysAndValues.length; t+=2){ 
		var thisElement = keysAndValues[t]; 
		stringKeys.push(thisElement); 
	
		var splitElements = thisElement.split(':'); 
		keys.push(splitElements[0]); 
	}

	this.keys = keys; 
	this.stringKeys = stringKeys; 


	var values = []; 
	var g; 
	for(g = 1; g < keysAndValues.length; g+=2){ 
		var thisValue = keysAndValues[g]; 
		values.push(thisValue); 
	}


	this.values = values; 

	var f; 
	var headers = {}; 
	for(f = 0; f< headerArray.length; f++){ 
		headers[keys[f]] = values[f]; 
	}
	

	//END OF GETTING THE HEADERS 

	//GETTING THE BODY 
	var spaceSplit = s.split('\r\n'); 

	var r; 
	var body = ''; 
	for(r = 0; r < spaceSplit.length; r++){ 
		var currentElement = spaceSplit[r]; 
		if(currentElement === ''){ 
			var currIndex = r; 
		
			if(spaceSplit[currIndex+1] !== ' '){
				body = spaceSplit[currIndex+1]; 
				
			 }
		
		} 
	}
	this.headers = headers; 
	this.body = body; 

}

//TESTING REQUEST OBJECT 
// var req = new Request(s); 

// console.log("path"); 
// console.log(req.path); 
// console.log("method"); 
// console.log(req.method);
// console.log("headers"); 
// console.log(req.headers); 
// console.log("body"); 
// console.log(req.body); 
// console.log("keys"); 
// console.log(req.keys); 
// console.log("keys"); 
// console.log(req.values); 
// console.log("stringKeys"); 
// console.log(req.stringKeys); 
// console.log('length'); 


Request.prototype.toString = function(){ 
	var returnString = '';
	returnString += this.method + ' ' + this.path +' HTTP/1.1\r\n';
	var x; 
	var str = ''; 
	for(x = 0; x < this.stringKeys.length; x++){ 
		str = str + this.stringKeys[x] + ' ' + this.values[x] +  '\r\n'; 
	}

	console.log("THIS BODY"); 
	console.log(this.body); 
	var thisBody = this.body; 
	returnString = returnString + str + '\r\n'; 
	if(this.body === ''){ 
		returnString = returnString + '\r\n'; 
	} else { 
		returnString = returnString + this.body; 
	}
	return returnString; 
	
}



//the response object
function Response(sock){
	this.sock = sock;
	var headers = {};
	this.headers = headers; 
	var body = ''; 
	this.body = body; 
	var statusCode = '';
	this.statusCode = statusCode;   

	var codeObject = {}; 
	var codes = []; 
	codes.push(200); 
	codes.push(404); 
	codes.push(500); 
	codes.push(400); 
	codes.push(301); 
	codes.push(302); 
	codes.push(303); 

	var message = []; 
	message.push('OK');
	message.push('Not Found');
	message.push('Internal Server Error');
	message.push('Bad Request');
	message.push('Moved Permanently');
	message.push('Found');
	message.push('See Other');
	
	var q; 
	for(q = 0; q < codes.length; q++){ 
		codeObject[codes[q]] = message[q]; 
	}
	this.codeObject = codeObject; 
}





var net = require('net'); 
var fs = require('fs'); 
var server = net.createServer(function(sock){
	sock.on('data', function(data){
		

		var dataString = ''; 
		dataString = dataString + data; 
		var req = new Request(dataString); 
		var res = new Response(sock); 
		


		 //VERSION BEFORE CREATING RESPONSE OBJECT 
		// var path = req.path; 
		// //var path = '/'; 
		// if(path === '/'){
		// 	sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n <link rel = "stylesheet" type = "text/css" href = "/foo.css">'); 
		// 	sock.write(' <h2> This is a red header! </h2>\r\n\r\n <em> Hello </em> <strong> World </strong> '); 
		// 	sock.end(); 
		// } else if(path === '/foo.css'){
		// 	sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/css\r\n\r\n h2 {color: red;} '); 
		// 	sock.end(); 
		// } else{
		// 	sock.write('HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n page not found  '); 
		// 	sock.end(); 
		// }	


		//VERSION AFTER CREATING RESPONSE OBJECT 
		//var path = '/'; 
		//var path = '/foo.css'; 
		//var path = '/img/bmo1.gif'; 
		
		// var path = req.path; 
		// //var path = '/test.html'; 
		// if(path === '/'){ 
		// 	res.setHeader('Content-Type', 'text/html');
		// 	res.send(200, '<em> Hello </em> <strong> World </strong>'); 
		// 	var allToString = res.toString(); 
		
	
		// } else if( path === '/foo.css'){ 
		// 	res.setHeader('Content-Type', 'text/css');
		// 	res.send(200, 'h2 {color: red;}'); 

		// } else if (path === '/test.html'){
		// 	console.log('WE MADE IT HERE'); 
		// 	//res.sendFile(path);

		// } else if(path === '/img/bmo1.gif'){
		// 	//res.sendFile(path); 

		// } else { 
		// 	res.setHeader('Content-Type', 'text/plain');
		// 	res.send(404, 'Page Not Found'); 
		// 	//res.sendFile(path); 
		// }

		


		//CHECKING THE RESPONSE FUNCTIONS 
		// 	res.statusCode = '200'; 
		// 	console.log('status code'); 
		// 	console.log(res.statusCode); 

		// 	// res.setHeader('Content-Type', 'text/html');
		// 	// res.setHeader('something-else', 'text/css'); 
		// 	// console.log('set header'); 
		// 	// console.log(res.headers); 

		// 	console.log('message'); 
		// 	console.log(res.codeObject[res.statusCode]); 

		// var path = req.path; 
		// console.log("path"); 
		// console.log(path); 
		// console.log('writing'); 
		// var g = 'hello'; 
		// //getting undefined 
		// //console.log(res.write(g)); 

		// res.send(301, 'foo'); 
		// console.log('setting new status code'); 
		// console.log(res.statusCode); 
		// console.log('body'); 
		// console.log(res.body); 
		


		// CHECKING SENDFILE 
		//res.sendFile('/html/test.html'); 
		//res.sendFile('/img/bmo1.gif'); 

		//CHECKING WHICH FUNCTIONS TO USE FOR FANSITE.JS
			if(req.path === '/'){ 
			res.sendFile('/homePage.html'); 
		} else if(req.path === '/about' || req.path === '/about/'){ 
			res.sendFile('/about/about.html'); 
		} else if (req.path === '/lizzie-mcguire.jpg'){ 
			res.sendFile('/lizzie-mcguire.jpg'); 
		} else if(req.path === '/css/base.css'){ 
			res.sendFile('/css/base.css'); 
		} else if(req.path === '/rando' || req.path === '/rando/' ){ 
			var randomNum = Math.floor(Math.random() * 3) + 1; 
			if(randomNum === 1){ 
				res.sendFile('/rando/image1.jpg'); 
			} else if (randomNum === 2){ 
				res.sendFile('/rando/image2.png'); 
			} else { 
				res.sendFile('/rando/image3.gif'); 
			}
		} else if(req.path === '/home' || req.path === '/home/'){ 
			res.redirect(301, '/'); 
		}


		else { 
			res.setHeader('Content-Type', 'text/plain'); 
			res.send(404, res.codeObject[404]); 
		}


		
		 


})
	})



Response.prototype.toString = function (){ 
	var str = ''; 
	str = str + 'HTTP/1.1 ';  
	var status = this.statusCode; 
	var thisValue = this.codeObject[status]; 
	
	var numberHeaders = Object.keys(this.headers).length; 
	if(numberHeaders == 0){ 
		str = str + status + ' ' + thisValue + '\r\n'; 
		str += '\r\n'; 
		return str; 
	} else { 
		
		var i; 
		var headerString = ''; 
		for(i = 0; i < Object.keys(this.headers).length; i++){ 

			for(i in this.headers){ 
				headerString = headerString + i + ': ' + this.headers[i] + '\r\n';

				}
		}

		str = str + status + ' ' + thisValue + '\r\n'; 
		str += headerString + '\r\n';
		var bod = this.body; 
		str += bod; 
		return str; 
		
	}
}

Response.prototype.setHeader = function(name, value){ 
		this.headers[name] = value; 
		
	}

Response.prototype.write = function(data){ 
	
		this.sock.write(data); 
	
}

Response.prototype.end = function(s){ 
	this.sock.end(s); 
}

//passing the test but I'm not sure if im doing this right 
Response.prototype.send = function(statusCode, body){
	this.statusCode = statusCode; 
	this.body = body; 
	this.write(this.toString()); 
	this.end(); 
}

Response.prototype.writeHead = function (statusCode){
	this.statusCode = statusCode; 
	this.write(this.toString()); 
}

Response.prototype.redirect = function(statusCode, url){
	var size = arguments.length; 
 
	var getMessage = ''; 
	var str = ''; 
	var newVal = '';
	
	if(size == 2){ 
		getMessage = this.codeObject[statusCode]; 
		this.statusCode = statusCode; 

		str += 'HTTP/1.1 ' + this.statusCode + ' ' + getMessage + '\r\n'; 
		 
		newVal += url; 
		this.headers['Location'] = newVal; 
		str += 'Location: ' + newVal + '\r\n'; 
		console.log("ENDING STRING"); 
		console.log(str); 
		this.end(str); 
} else { 
	var status = 301; 

	getMessage = this.codeObject[status]; 
	this.statusCode = status; 

	str += 'HTTP/1.1 ' + status + ' ' + getMessage + '\r\n'; 

	newVal += arguments[0]; 

	this.headers['Location'] = newVal; 
	str += 'Location: ' + newVal + '\r\n'; 
	console.log("ENDING STRING"); 
	console.log(str); 
	this.end(str); 
}

} 

Response.prototype.sendFile = function(fileName){ 
	var publicRoot = __dirname + '/../public'; 

	 console.log('public root '); 
	 console.log(publicRoot); 
	var filePath = publicRoot + fileName; 

	var split = fileName.split('.'); 
	var extension = split[1];
	var textBased;  
	if(extension === 'jpeg' || extension === 'jpg'){ 
		this.headers['Content-Type'] = 'image/jpeg'; 
		textBased = false; 
	} else if (extension === 'png'){ 
		this.headers['Content-Type'] = 'image/png'; 
		textBased = false; 
	} else if (extension === 'gif'){ 
		this.headers['Content-Type'] = 'image/gif'; 
		textBased = false; 
	} else if (extension === 'html'){ 
		console.log("WE MADE IT TO HTML"); 
		this.headers['Content-Type'] = 'text/html'; 
		textBased = true;
		console.log("HEADERS"); 
		console.log(this.headers); 
		console.log(textBased); 
	} else if (extension === 'css'){ 
		this.headers['Content-Type'] = 'text/css'; 
		textBased = true; 
	} else { 
		this.headers['Content-Type'] = 'text/plain'; 
		textBased = true; 
	}



	var contentType; 
	if(textBased === true){ 
		contentType = this.headers['Content-Type']; 
		fs.readFile(filePath, {"encoding": "utf8"}, this.handleRead.bind(this, contentType)); 
		
	} else { 
		contentType = this.headers['Content-Type']; 
		fs.readFile(filePath, {}, this.handleRead.bind(this, contentType)); 
	}

}

Response.prototype.handleRead = function(contentType, err, data){ 
	
	// console.log("THIS IS THE ERROR"); 
	// console.log(err); 
	if(err){ 
	
		this.setHeader('Content-Type', contentType); 

		this.send(500, 'An error has occured!'); 
	
	} else { 
		this.setHeader('Content-Type', contentType); 
		this.writeHead(200); 

		this.write(data); 
		this.end(); 
	}
	
}

server.listen(8080, '127.0.0.1'); 



//APP OBJECT represents a web application 
//it's responsible for accepting incoming http requests
//holding routes, or url/path combinations 
//determine what to do based on the incoming request 
//sending back a response 

//The App object represents both a web server and the web application running on that server 
function App(){ 
	//an instance of a Server object 
	//when you create a server using net.createServer, it expects a callback function 
	//to be specified when a client connects to the server 
	//that method will be a method that i define handleConnection 
	var server = net.createServer(this.handleConnection.bind(this)); 
	this.server = server; 
	//an object that maps paths to callback functions 
	var routes = {}; 
	this.routes = routes; 

}



//get adds path as a property name in routes, the value of which is the callback function cd 
App.prototype.get = function(path, cb){ 
	//cb called when path is requested; what to do when a specific path is asked for 

	
	this.routes[path] = cb; 

	

}

//callback function takes two arguments a Request and Response object 
// function callBack(req, res){ 
	

// }


//binds the server to the given port and host "listens" on host:port
//port - the port number to bind to 
//host - the host the server will be running on 
App.prototype.listen = function(port, host){ 
	server.listen(port, host); 
}


//function called when a client connects to the server 
//sets the callback for the socket's on method 
//this is the callback for net.createServer function 
//sock - the socket representing the connection to the client
App.prototype.handleConnection = function(sock){ 
	//changes handleRequestData to only have one argument, sock? right? 
	sock.on('data', this.handleRequestData.bind(this, sock)); 
}


//function called when the socket recieves data from the client 
//assu,es that once it recieves data, the data recieved is the entire request 
//processes a request and sends back the data 
App.prototype.handleRequestData = function(sock, binaryData){ 
	var dataStr = ''; 
	dataStr += binaryData; 
	var req = new Request(dataStr); 
	var res = new Response(sock); 
	sock.on('close', this.logResponse.bind(this, req, res)); 
	var pathProperty = this.req.path; 
	if(pathProperty in this.routes){ 
		var execute = this.routes[pathProperty]; 
		execute(req, res); 
	} else { 
		send(404, res.codeObject[404]); 
	}


}

//logs out the http request method and path and response status code and short message 
//req - incoming http request 
// res - the resulting http response 
App.prototype.logResponse = function (req, res){ 

	//do not know how to access these variables 
	var m = this.req.method; 
	var p = this.req.path; 
	var c = this.res.statusCode; 
	var co = codeObject[c]; 
	console.log('method', m); 
	console.log('path', p); 
	console.log('status code', c); 
	console.log('status code message', co); 


}



