// warmUp.js
//Author: Haley Danylchuk 

//check if you did headers right 
//how to do headers for multiple headers? 

// var s = ''
// s += 'GET /foo.html HTTP/1.1\r\n';   // request line
// s += 'Host: localhost:8080\r\n';     // headers
// s += '\r\n\r\n'; 

   
/* OLD WARMUP.JS

   var s = 'GET /foo.html HTTP/1.1\r\n';
        s += 'Host: localhost:8080\r\n';
        s += 'Referer: http://bar.baz/qux.html\r\n';
        s += '\r\n';

console.log("this is s"); 
console.log(s); 

function Request(s){ 
	var requestParts = s.split(' '); 
	//console.log("request parts"); 
	//console.log(requestParts); 
	var path = requestParts[1]; 
	this.path = path; 
	var method = requestParts[0]; 
	this.method = method; 
	var headerParts = s.split('\r\n'); 
	
	var headerPartsTwo = headerParts[1]; 
	var splitHeader = headerPartsTwo.split(' '); 
	

	var key = splitHeader[0]; 
	var headerK = key.split(':'); 
	var headerKey = headerK[0]; 3
	this.headerKey = headerKey; 
	var headerValue = splitHeader[1]; 
	this.headerValue = headerValue; 
	//console.log(headerValue); 
	//console.log(headerKey);  
	//var headerPartsTwo = headerParts.split(':'); 
	//console.log("header parts "); 
	//console.log(headerParts); 
	var headers = {}; 
	headers[headerKey] = headerValue;
	//console.log("headers"); 
	//console.log(headers);  
	this.headers = headers; 
	var body = ''; 
	this.body = ''; 
}

var req = new Request(s); 

console.log("path"); 
console.log(req.path); 
console.log("method"); 
console.log(req.method);
console.log("headers"); 
console.log(req.headers); 

var headerString = JSON.stringify(req.headers); 
console.log('header string'); 
console.log(headerString);  

function toString(req){ 
	return req.method +  req.path +' HTTP/1.1\r\n'  + req.headerKey + ':' + ' ' + req.headerValue +  '\r\n\r\n' + req.body; 
}

console.log("This is toString"); 
console.log(toString(req)); 

//the response object 
// function Response(req){
// 	var this.sock = sock;
// 	var headers = {};
// 	var body = ''; 
// 	var statusCode = '';  


// }

*/ 

function Request(s){ 
	var requestParts = s.split(' '); 
	// console.log("request parts"); 
	// console.log(requestParts); 
	var path = requestParts[1]; 
	this.path = path; 
	var method = requestParts[0]; 
	this.method = method; 
	// console.log(method); 
	// console.log(path); 

	//THIS IS ALL FOR GETTING THE HEADERS 
	var gettingHeaders = s.split('\r\n'); 
	// console.log('gettingHeaders length'); 
	// console.log(gettingHeaders.length); 
	//console.log("getting HEADERS"); 
	//console.log(gettingHeaders[0]); 
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

	// console.log('header array'); 
	// console.log(headerArray.length); 
	// console.log(headerArray[0]); 
	// console.log(headerArray[1]); 


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

	// console.log("IDK WHAT"); 
	// console.log(keysAndValues[0]); 
	// console.log(keysAndValues[1]); 
	// console.log(keysAndValues[2]); 
	// console.log(keysAndValues[3]); 
	var stringKeys = []; 
	var keys = []; 
	var t; 
	for(t = 0; t < keysAndValues.length; t+=2){ 
		var thisElement = keysAndValues[t]; 
		stringKeys.push(thisElement); 
		// console.log('HELL'); 
		// console.log(stringKeys[0]); 
		var splitElements = thisElement.split(':'); 
		keys.push(splitElements[0]); 
	}
	// console.log('keys length'); 
	// console.log(keys.length); 
	// console.log(keys[0]); 
	// console.log(keys[1]); 
	this.keys = keys; 
	this.stringKeys = stringKeys; 


	var values = []; 
	var g; 
	for(g = 1; g < keysAndValues.length; g+=2){ 
		var thisValue = keysAndValues[g]; 
		values.push(thisValue); 
	}
	// console.log('values length'); 
	// console.log(values.length); 
	// console.log(values[0]); 
	// console.log(values[1]); 

	this.values = values; 

	var f; 
	var headers = {}; 
	for(f = 0; f< headerArray.length; f++){ 
		headers[keys[f]] = values[f]; 
	}
	// console.log('headers'); 
	// console.log(headers); 


	//END OF GETTING THE HEADERS 

	//GETTING THE BODY 
	var spaceSplit = s.split('\r\n'); 
	// console.log('length'); 
	// console.log(spaceSplit.length); 
	// console.log(spaceSplit[0]); 
	// console.log(spaceSplit[1]); 
	// console.log(spaceSplit[2]); 
	// console.log(spaceSplit[3]); 
	var r; 
	var body = ''; 
	for(r = 0; r < spaceSplit.length; r++){ 
		var currentElement = spaceSplit[r]; 
		if(currentElement === ''){ 
			var currIndex = r; 
			//var bodyBeginning = currentElement; 
			// console.log('body'); 
			// console.log(bodyBeginning); 
			// console.log(currIndex); 
			if(spaceSplit[currIndex+1] !== ' '){
				body = spaceSplit[currIndex+1]; 
				// console.log('body'); 
				// console.log(body); 
			 }
			//  else { 
			//  	body = ''; 
			// // 	body = 'hello'; 
			// // 	console.log('body'); 
			// // 	console.log(body); 
			// }
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
	// console.log("HEADER STRING"); 
	// console.log(str); 
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
var net = require('net'); 
var server = net.createServer(function(sock){
	sock.on('data', function(data){
		sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n <em> Hello </em> <strong> World </strong>'); 
		sock.end(); 
	})




})

server.listen(8080, '127.0.0.1'); 