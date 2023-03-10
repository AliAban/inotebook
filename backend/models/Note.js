const {
    default: mongoose,
    Schema
} = require("mongoose")

const NotesSchema = new Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"noteUser"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        default: "general"
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("notes", NotesSchema);