// miniWeb.js
// Author: Haley Danylchuk 
// define your Request, Response and App objects here


module.exports = { 
	Request: Request,
	Response: Response 
	
}

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

// console.log("This is toString"); 
// console.log(req.toString()); 

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
		//CHECKING THE RESPONSE FUNCTIONS 
		//HOW/WHEN DOES REDIRECT COME INTO PLAY???
		// res.writeHead DOES NOT WORK 
		// end and write being weird 
			res.statusCode = '200'; 
			console.log('status code'); 
			console.log(res.statusCode); 

			res.setHeader('Content-Type', 'text/html');
			res.setHeader('something-else', 'text/css'); 
			console.log('set header'); 
			console.log(res.headers); 

			console.log('message'); 
			console.log(res.codeObject[res.statusCode]); 

		var path = req.path; 
		console.log("path"); 
		console.log(path); 
		console.log('writing'); 
		var g = 'hello'; 
		//getting undefined 
		console.log(res.write(g)); 

		res.send(301, 'foo'); 
		console.log('setting new status code'); 
		console.log(res.statusCode); 
		console.log('body'); 
		console.log(res.body); 
		//res.write does not work 
		//res.writeHead('200'); 

		console.log('all to string'); 
		console.log(res.toString()); 


		//NEW VERSION AFTER CREATED RESPONSE OBJECT 
		// var path = '/'; 
		// if(path === '/'){ 
		// 	res.setHeader('Content-Type', 'text/html'); 
		// 	// res.statusCode = '200'; 
		// 	var statusMessage = res.codeObject[res.statusCode]; 
		// 	//var entireMessage = 'HTTP/1.1 ' + res.statusCode + ' ' + statusMessage + '\r\n' + res.headers + '\r\n\r\n' + '<link rel = "stylesheet" type = "text/css" href = "/foo.css">'; 
		// 	//res.write(entireMessage); 
		// 	var mess = 'HTTP/1.1 ' + res.statusCode + ' ' + statusMessage + '\r\n' + res.headers + '\r\n\r\n' + '<h2> hello world </h2>'; 
		// 	res.write(mess); 
		// 	res.end(); 
		// }

		/* OLD VERSION BEFORE CREATED RESPONSE OBJECT 
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
		*/ 


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

//passes can write without ending test 
//does binary data or string matter??
Response.prototype.write = function(data){ 
	var str = ""; 
	str += data; 
	//this.sock.write(str); 
	this.sock.write(str); 
}

//do I need the write in there??
Response.prototype.end = function(s){ 
	var str = ''; 
	str += s; 
	//this.sock.write(str); 
	this.sock.end(str); 
}

//passing the test but I'm not sure if im doing this right 
Response.prototype.send = function(statusCode, body){
	this.statusCode = statusCode; 
	this.body = body; 
	this.end(); 
}

Response.prototype.writeHead = function (statusCode){
	this.statusCode = statusCode; 
	//does write have to have arguments passed to it? 
	this.write(); 
}

Response.prototype.redirect = function(statusCode, url){
	var size = arguments.length; 
	// console.log('SIZE SIZE SIZE ');
	// console.log(size);  
	var getMessage = ''; 
	var str = ''; 
	var newVal = '';
	
	if(size == 2){ 
		getMessage = this.codeObject[statusCode]; 
		this.statusCode = statusCode; 
		// console.log("STATUS CODE"); 
		// console.log(statusCode); 
		str += 'HTTP/1.1 ' + this.statusCode + ' ' + getMessage + '\r\n'; 
		 
		newVal += url; 
		this.headers['Location'] = newVal; 
		str += 'Location: ' + newVal + '\r\n'; 
		console.log("ENDING STRING"); 
		console.log(str); 
		this.end(str); 
} else { 
	var status = 301; 
	// var getMessage = ''; 
	// var str = ''; 
	getMessage = this.codeObject[status]; 
	this.statusCode = status; 
	// console.log("STATUS CODE"); 
	// console.log(status); 
	str += 'HTTP/1.1 ' + status + ' ' + getMessage + '\r\n'; 
	//var newVal = ''; 
	newVal += arguments[0]; 
	// console.log("WHAT VALUE IS THIS"); 
	// console.log(newVal); 
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
		this.headers['Content-Type'] = 'text/html'; 
		textBas3ed = true;
	} else if (extension === 'css'){ 
		this.headers['Content-Type'] = 'text/css'; 
		textBased = true; 
	} else { 
		this.headers['Content-Type'] = 'text/plain'; 
		textBased = true; 
	}

	if(textBased === true){ 
		var contentType = this.headers['Content-Type']; 
		fs.readFile(this.fileName, {encoding:'utf8'}, this.handleRead.bind(this, contentType)); 
		
	} else { 
		fs.readFile(this.fileName, {}, this.handleRead.bind(this, contentType)); 
	}

}

Response.prototype.handleRead = function(err, data){ 
	this.setHeader('Content-Type', this.contentType); 
	this.writeHead(200); 
	//dont understand 3 
	this.end(); 
}

server.listen(8080, '127.0.0.1'); 



//APP OBJECT 
function App
