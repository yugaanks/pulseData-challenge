var faker = require('faker');
const data = require("../data/");
const users = data.users;


function generateSampleData() {
	for(let i=0;i<2000;i++) {
		var randomName = faker.name.findName(); // random name
		var randomEmail = faker.internet.email(); // random email
		var randomCity = faker.address.city(); // random city
		users.addUser(i+1, randomName, randomEmail, randomCity);
	}
}

generateSampleData();