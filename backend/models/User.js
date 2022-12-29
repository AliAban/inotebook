const {
    default: mongoose,
    Schema
} = require("mongoose")


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// creates a collection in database with a name plural of noteUser using UserSchema 
const User =  mongoose.model("noteUser", UserSchema);

// User.createIndexes();   //this makes the email field unique

module.exports = User;