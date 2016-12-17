
/***************************************
 * 
 * 
 * Currently we are not using this model and mongoose also
 * 
 * **************************************/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// local: {
//         phone: String,
//         password: String
//     },
//     facebook: {
//         id: String,
//         token: String,
//         email: String,
//         name: String
//     },
//     twitter: {
//         id: String,
//         token: String,
//         displayName: String,
//         username: String
//     },
//     google: {
//         id: String,
//         token: String,
//         email: String,
//         name: String
//     }

// define the schema for our user model
var userSchema = mongoose.Schema({
    phone: String,
    password: String,
    userRole: String
});

// methods ====================== generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compare(password, this.password);
    // TODO: need to implement hashing in next ticket
    // return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);