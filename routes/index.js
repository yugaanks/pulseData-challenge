const path = require('path');
const data = require("../src/data/");
const users = data.users;

const constructorMethod = (app) => {
    
    
	app.get("/", async (req, res) => {
        var result=await users.getAllUsers(0,1000);
        var scripts = [{ script: '/js/fixedHeader.js'}, {script: '/js/infinity.js'}];
        res.render('home', {result: result, scripts: scripts});
	});

    app.get('/users', (req,res)=>{
    	var skip=0, take=0;
		if(req.query.skip)
			skip=Number(req.query.skip);
		if(req.query.take)
			take=Number(req.query.take);
		users.getAllUsers(skip, take).then((result)=>{
			res.json(result);
		}).catch((err)=>{
			res.json(err);
		});
	});

    app.use("/*", (req, response) => {
		let route = path.resolve('public/error.html');
		response.status(404).sendFile(route);    
	});
};

module.exports = constructorMethod;