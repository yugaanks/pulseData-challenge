const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

let exportedMethods = {
    
    async getAllUsers(skip, take) {
        let userCollection = await users();
        return await userCollection.find().skip(skip).limit(take).sort({id: 1}).toArray();
    },

    async addUser(id, name, email, city) {
        let userCollection = await users();
        let newUser = {
            id: id,
            name: name,
            email: email,
            city: city                
        };
        await userCollection.insertOne(newUser);
    }
}

module.exports = exportedMethods;