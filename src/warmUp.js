// warmUp.js
//Author: Haley Danylchuk 

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
	//key names of header to access them in toString() method 
	this.keys = keys; 
	this.stringKeys = stringKeys; 
	var values = []; 
	var g; 
	for(g = 1; g < keysAndValues.length; g+=2){ 
		var thisValue = keysAndValues[g]; 
		values.push(thisValue); 
	}
	//values of headers to access them in toString() method 
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

//testing the Request Object's properties 
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