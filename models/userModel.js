const mongoose = require('mongoose');

// schema design

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: [true, "name is required"],
    },
    email:{
        type : String,
        required: [true, "email is required"],
        unique : true,
    },
    password:{
        type : String,
        required: [true, "password is required"],
    },
},
{timestamps : true}
)

//export model and using this model we can perform CRUD operations
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;