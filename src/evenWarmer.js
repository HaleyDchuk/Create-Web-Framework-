// evenWarmer.js
// create Request and Response constructors...
//Haley Danylchuk 

module.exports = { 
	Request: Request,
	Response: Response, 
	
	
}

// var fileName = '/test'; 
// var publicRoot = __dirname + '/../public'; 
// console.log('directory name'); 
// console.log(__dirname); 
// 	var filePath = publicRoot + fileName; 
// 	console.log('file path'); 
// 	console.log(filePath); 
// 	var spl = filePath.split('/'); 
// 	console.log("splitting"); 
// 	console.log(spl); 


 
 



// var testObject = {}; 
// var animals = ['cats', 'dogs', 'monkeys']; 
// //var animals = []; 
// //var age = []; 
// var age = ['3', '4', '5']; 
// var b; 
// for(b = 0; b < animals.length; b++){ 
// 	testObject[animals[b]] = age[b];  
// }
// console.log("LENGTH OF ANIMAL THING"); 
// console.log(Object.keys(testObject).length); 
// var i; 
// var printThis = ''; 
// //console.log("PRINTING NOW"); 
// for(i = 0; i < Object.keys(testObject).length; i++){ 

// for(i in testObject){ 
// 	//console.log("THIS IS i"); 
// 	//console.log(i + ': '); 
// 	//console.log(testObject[i]); 
// 	printThis = printThis + i + ': ' + testObject[i] + '\r\n'; 

// 	//console.log(i); 
// // 	for(key in testObject[i]){
// // 		console.log(key + ': ' + testObject[i][key]); 
// // 	} 

// 	}
// // 	console.log("PRINT THIS"); 
// // console.log(printThis); 
// }
// 	console.log("PRINT THIS"); 
// console.log(printThis); 






// var s = ''
// s += 'GET /foo.html HTTP/1.1\r\n';   // request line
// s += 'Host: localhost:8080\r\n';     // headers
// s += '\r\n\r\n'; 


   // var s = 'GET /foo.html HTTP/1.1\r\n';
   //      s += 'Host: localhost:8080\r\n';
   //      s += 'Referer: http://bar.baz/qux.html\r\n';
   //      s += '\r\n';

     // var s = 'POST /foo/create HTTP/1.1\r\n';
     //    s += 'Host: localhost:8080\r\n';
     //    s += 'Referer: http://bar.baz/qux.html\r\n';
     //    s += '\r\n';
     //   s += 'foo=bar&baz=qux';

        // var s = 'POST /foo/create HTTP/1.1\r\n';
        // s += 'Host: localhost:8080\r\n';
        // s += 'Referer: localhost:8080/referer.html\r\n';
        // s += '\r\n';
        // s += 'foo=bar&baz=qux';
//var s = ''; 
// console.log("this is s"); 
// console.log(s); 

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
		console.log("SOCK"); 
		console.log(req.toString(sock)); 
		var res = new Response(sock); 
		//CHECKING THE RESPONSE FUNCTIONS 
		//HOW/WHEN DOES REDIRECT COME INTO PLAY???
		// res.writeHead DOES NOT WORK 
		// end and write being weird 
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
		


		//NEW NEW VERSION CHECKING SENDFILE 
		//res.sendFile('/html/test.html'); 
		//res.sendFile('/img/bmo1.gif'); 
		//res.setHeader('Content-Type', 'text/html'); 
		//res.send(200, 'Lizzie'); 
	
		
		//res.sendFile('/css/foo.css'); 
		

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


		//res.setHeader('Content-Type', 'text/html'); 
		//res.send(200, '<h1> I love lizzie </h1>'); 


		//NEW  VERSION AFTER CREATED RESPONSE OBJECT 
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

		 //OLD VERSION BEFORE CREATED RESPONSE OBJECT 
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
		//console.log("ENDING STRING"); 
		//console.log(str); 
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
	//var publicRoot = '/Users/haleydanylchuk/hed248-homework03/public'; 
	//console.log('directory name'); 
	// console.log(__dirname); 
	 console.log('public root '); 
	 console.log(publicRoot); 
	var filePath = publicRoot + fileName; 
	// console.log('file path'); 
	// console.log(filePath); 
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
	//how do we know that something went wrong, if there is data in the error object? 
	console.log("THIS IS HTE ERROR"); 
	console.log(err); 
	if(err){ 
		console.log("THERE IS AN ERROR"); 
		//var codeMessage = this.codeObject[500]; 
		this.setHeader('Content-Type', contentType); 
		//sets status code and body 
		this.send(500, 'An error has occured!'); 
		//call to string within write??? 
		//this.write(toString()); 
		//end 
		//this.end(); 
		//console.log('RESPONSE TO STRING'); 
		//console.log(res.toString()); 
	} else { 
		console.log("NO ERROR"); 
		this.setHeader('Content-Type', contentType); 
		this.writeHead(200); 
		//this.send(200, this.codeObject[200]); 
		//this.send(200, data); 
		//dont understand 3 
		this.write(data); 
		this.end(); 
	}
	
}

server.listen(8080, '127.0.0.1'); 