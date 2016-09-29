  var s = 'POST /foo/create HTTP/1.1\r\n';
        s += 'Host: localhost:8080\r\n';
        s += 'Referer: http://bar.baz/qux.html\r\n';
        s += '\r\n\r\n';
        //s += 'foo=bar&baz=qux';


console.log("this is s"); 
console.log(s); 


var requestParts = s.split(' '); 
	// console.log("request parts"); 
	// console.log(requestParts); 
	var path = requestParts[1]; 
	this.path = path; 
	var method = requestParts[0]; 
	this.method = method; 
	console.log(method); 
	console.log(path); 

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

	var keys = []; 
	var t; 
	for(t = 0; t < keysAndValues.length; t+=2){ 
		var thisElement = keysAndValues[t]
		var splitElements = thisElement.split(':'); 
		keys.push(splitElements[0]); 
	}
	// console.log('keys length'); 
	// console.log(keys.length); 
	// console.log(keys[0]); 
	// console.log(keys[1]); 


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

	var f; 
	var headers = {}; 
	for(f = 0; f< headerArray.length; f++){ 
		headers[keys[f]] = values[f]; 
	}
	console.log('headers'); 
	console.log(headers); 
	// var headers = {}; 
	// headers['hello'] = 'word'; 
	// console.log('headers object'); 
	// console.log(headers); 

	//END OF GETTING THE HEADERS 
	var spaceSplit = s.split('\r\n'); 
	// console.log('length'); 
	// console.log(spaceSplit.length); 
	// console.log(spaceSplit[0]); 
	// console.log(spaceSplit[1]); 
	// console.log(spaceSplit[2]); 
	// console.log(spaceSplit[3]); 
	var r; 
	var body = ' '; 
	for(r = 0; r < spaceSplit.length; r++){ 
		var currentElement = spaceSplit[r]; 
		if(currentElement === ''){ 
			var currIndex = r; 
			var bodyBeginning = currentElement; 
			// console.log('body'); 
			// console.log(bodyBeginning); 
			// console.log(currIndex); 
			if(spaceSplit[currIndex+1] !== ' '){
				body = spaceSplit[currIndex+1]; 
				console.log('body'); 
				console.log(body); 
			 }
			// else { 
			// 	body = 'hello'; 
			// 	console.log('body'); 
			// 	console.log(body); 
			// }
		}
	}

	