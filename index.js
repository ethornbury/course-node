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
	if(l<= 0 || b <= 0){
		console.log("rect dimesions should be greater than 0");
	}else{
		console.log("the area is " + rect.area(l, b));
		console.log("the perimeter is " + rect.perimeter(l, b));
	}
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);

