var i = 0;
var interval = setInterval(function(){
	i = i + 1;
	console.log(i);
}, 1000);

setTimeout(function(){
	clearInterval(interval);
}, 3000)