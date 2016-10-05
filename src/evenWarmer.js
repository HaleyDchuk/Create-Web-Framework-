// evenWarmer.js
// create Request and Response constructors...
//Haley Danylchuk 

module.exports = { 
	Request: Request,
	Response: Response
	
	
}


//Constructing the Request Object 
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

//Testing the Request Object 
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


//Request toString function 
Request.prototype.toString = function(){ 
	var returnString = '';
	returnString += this.method + ' ' + this.path +' HTTP/1.1\r\n';
	var x; 
	var str = ''; 
	for(x = 0; x < this.stringKeys.length; x++){ 
		str = str + this.stringKeys[x] + ' ' + this.values[x] +  '\r\n'; 
	}
 
	var thisBody = this.body; 
	returnString = returnString + str + '\r\n'; 
	if(this.body === ''){ 
		returnString = returnString + '\r\n'; 
	} else { 
		returnString = returnString + this.body; 
	}
	return returnString; 
	
}



//the Response Object Constructor 
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
		console.log("SOCK"); 
		console.log(req.toString(sock)); 
		var res = new Response(sock);


		//FIRST VERSION BEFORE CREATED RESPONSE OBJECT 
		var path = req.path; 
		//var path = '/'; 
		if(path === '/'){
			sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n <link rel = "stylesheet" type = "text/css" href = "/foo.css">'); 
			sock.write(' <h2> This is a red header! </h2>\r\n\r\n <em> Hello </em> <strong> World </strong> '); 
			sock.end(); 
		} else if(path === '/foo.css'){
			sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/css\r\n\r\n h2 {color: red;} '); 
			sock.end(); 
		} else{
			sock.write('HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\n page not found  '); 
			sock.end(); 
		}	



		// VERSION AFTER RESPONSE OBJECT WAS CREATED 
		// var path = '/'; 
		// var path = '/foo.css'; 
		// var path = '/img/bmo1.gif'; 
		
		// var path = req.path; 
		// //var path = '/test.html'; 
		// if(path === '/'){ 
		// 	res.setHeader('Content-Type', 'text/html');
		// 	res.send(200, '<em> Hello </em> <strong> World </strong>'); 
		
	
		// } else if( path === '/foo.css'){ 
		// 	res.setHeader('Content-Type', 'text/css');
		// 	res.send(200, 'h2 {color: red;}'); 

		// } else if (path === '/test.html'){
		// 	res.sendFile(path);

		// } else if(path === '/img/bmo1.gif'){
		// 	res.sendFile(path); 

		// } else { 
		// 	res.setHeader('Content-Type', 'text/plain');
		// 	res.send(404, 'Page Not Found'); 
		// 	//res.sendFile(path); 
		// }



		//CHECKING THE RESPONSE OBJECT FUNCTIONS 
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
		


		//THIS IS FOR CHECKING IF SENDFILE WORKS
		//res.sendFile('/html/test.html'); 
		//res.sendFile('/img/bmo1.gif'); 
		//res.setHeader('Content-Type', 'text/html'); 
		//res.send(200, 'Lizzie'); 
		//res.sendFile('/css/foo.css'); 
		
		

		//THIS IS FOR TESTING METHODS TO USE FOR FANSITE.JS
		// if(req.path === '/'){ 
		// 	res.sendFile('/homePage.html'); 
		// } else if(req.path === '/about' || req.path === '/about/'){ 
		// 	res.sendFile('/about/about.html'); 
		// } else if (req.path === '/lizzie-mcguire.jpg'){ 
		// 	res.sendFile('/lizzie-mcguire.jpg'); 
		// } else if(req.path === '/css/base.css'){ 
		// 	res.sendFile('/css/base.css'); 
		// } else if(req.path === '/rando' || req.path === '/rando/' ){ 
		// 	var randomNum = Math.floor(Math.random() * 3) + 1; 
		// 	if(randomNum === 1){ 
		// 		res.sendFile('/rando/image1.jpg'); 
		// 	} else if (randomNum === 2){ 
		// 		res.sendFile('/rando/image2.png'); 
		// 	} else { 
		// 		res.sendFile('/rando/image3.gif'); 
		// 	}
		// } else if(req.path === '/home' || req.path === '/home/'){ 
		// 	res.redirect(301, '/'); 
		// }
		// else { 
		// 	res.setHeader('Content-Type', 'text/plain'); 
		// 	res.send(404, res.codeObject[404]); 
		// }



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
		console.log("WE MADE IT TO TEXT BASED TRUE"); 
		contentType = this.headers['Content-Type']; 
		fs.readFile(filePath, {"encoding": "utf8"}, this.handleRead.bind(this, contentType)); 
		
	} else { 
		console.log("HELLLLLLLLLLLLLLO"); 
		contentType = this.headers['Content-Type']; 
		fs.readFile(filePath, {}, this.handleRead.bind(this, contentType)); 
	}

}

Response.prototype.handleRead = function(contentType, err, data){ 

	//console.log("THIS IS HTE ERROR"); 
	//console.log(err); 
	if(err){ 
		console.log("THERE IS AN ERROR"); 

		this.setHeader('Content-Type', contentType); 
		this.send(500, 'An error has occured!'); 

	} else { 
		console.log("NO ERROR"); 
		this.setHeader('Content-Type', contentType); 
		this.writeHead(200); 
		this.write(data); 
		this.end(); 
	}
	
}

server.listen(8080, '127.0.0.1'); 