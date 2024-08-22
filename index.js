const express = require("express")
const mongoose = require("mongoose")
const Chat = require("./models/chat.js")
const path = require("path")
const methodOverride = require('method-override')


const app = express();


let port = 5000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))



//mongoose main function
main().then((res) => { console.log("connections successfull") })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
}


//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find()

    res.render("index.ejs", { chats })
})

//new Chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
})

//create  message route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    })
    newChat.save().then((res) => console.log("new chat added")).catch((err) => { console.log(err) })
    res.redirect("/chats")
})

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params
    let chat = await Chat.findById(id)
    res.render("edit.ejs", { chat })

})

//update route

app.put('/chats/:id', async (req, res) => {
    let { id } = req.params
    let { msg: newMsg } = req.body
    let updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true })

})


//destroy route
app.delete("/chats/:id", async(req, res) => {
    let {id} = req.params
    let deleteChat = await Chat.findByIdAndDelete(id)
    console.log(deleteChat)
    res.redirect("/chats")
})

//------> ---- > ---> --> ->server listening
app.listen(port, () => {
    console.log("server is running on port 5000")
})