//js object created, if all in one file
/*
var rect = {
	perimeter: (x,y) => (2*(x+y)), 
	area: (x,y) => (x*y)
	//creating a function using arrow function support which includes
	//option to use typescript	
};
*/

//import from another file
var rect = require('./rectangle');


function solveRect(l, b){
	console.log("solving for rect with l: " +l+ " b: " +b );
	rect(l, b, (err, rectangle)=> {
		if(err){
			console.log("Error: ", err.message);
		}else{
			console.log("The area of rect: "+ rectangle.area());
			console.log("The perimeter of rect: "+ rectangle.perimeter());
		}
	});
	console.log("This statment is after the call to rect");
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);

