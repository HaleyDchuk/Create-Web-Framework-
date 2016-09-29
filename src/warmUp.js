// warmUp.js
//Author: Haley Danylchuk 

//check if you did headers right 
//how to do headers for multiple headers? 

// var s = ''
// s += 'GET /foo.html HTTP/1.1\r\n';   // request line
// s += 'Host: localhost:8080\r\n';     // headers
// s += '\r\n\r\n'; 

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
var net = require('net'); 
var server = net.createServer(function(sock){
	sock.on('data', function(data){
		sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n <em> Hello </em> <strong> World </strong>'); 
		sock.end(); 
	})




})

server.listen(8080, '127.0.0.1'); 