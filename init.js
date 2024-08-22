const mongoose = require("mongoose")
const Chat = require("./models/chat.js")


main().then((res) => { console.log("connection successful") }).catch((err) => { console.log(err) })


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp')
}

let testchats = [
    {
        from: "john",
        to: "evin",
        msg: "i am john",
        created_at: new Date(),
    },
    {
        from: "adam",
        to: "eva",
        msg: "i am adam",
        created_at: new Date(),
    },
    {
        from: "sam",
        to: "billert",
        msg: "i am john sam",
        created_at: new Date(),
    },

]

Chat.insertMany(testchats)

