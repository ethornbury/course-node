//original
//exports.perimeter = (x,y) => (2*(x+y));
//exports.area = (x,y) => (x*y);

module.exports = (x,y,callback) =>{
	if(x<= 0 ||  y<= 0){
		//asynchronous processing
		//setTimeout simulate a delay before call back comes in from other side
		setTimeout(() => 
			callback(new Error("rect dimensions should be greater than 0"),
			null), 
			2000);
		
	}else{
		setTimeout(() => 
			callback(null,
			{
				perimeter:() => (2*(x+y)),
				area:() => (x*y)
				//area:(x,y) => (x*y)
				//need to take out x,y from first set of brackets 
				//as will be retrieved from line 5
			}), 
			2000);
		
	}
};



