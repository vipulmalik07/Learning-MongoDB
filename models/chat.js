const mongoose = require("mongoose")
/**
 * -from
 * -to
 * -msg
 * -created_at
 */

const chatSchema = new mongoose.Schema({

    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxLength: 50,
        minLength: 1,
    },
    created_at: {
        type: Date,
        required: true,
    }

})

const Chat = mongoose.model("Chat",chatSchema)

module.exports = Chat


