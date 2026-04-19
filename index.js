const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const port = 3000;
const url = "mongodb://127.0.0.1:27017/whatsapp";
const Chat = require("./modules/chat.js");

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log(`Connected on ${url}`);
  })
  .catch((err) => {
    throw err;
  });

async function main() {
  await mongoose.connect(url);
}

//root dir
app.get("/", (req, res) => {
  res.send("working well");
});

//show chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//new chat creation path
app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

//post creation
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_date: new Date(),
  });
  newChat
    .save()
    .then((result) => {
      res.redirect("/chats");
    })
    .catch((err) => {
      throw err;
    });
});

//edit path
app.get("/chat/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//updating chats
app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updateChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true },
  );
  res.redirect("/chats");
});

//destory
app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
