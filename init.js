const mongoose = require("mongoose");
const Chat = require("./modules/chat.js");
const url = "mongodb://127.0.0.1:27017/whatsapp";

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

let allChat = [
  {
    from: "John",
    to: "Divyam",
    msg: "Padhle ! 🤬🤬",
    created_date: new Date(),
  },
  {
    from: "Divyam",
    to: "John",
    msg: "tujhe pta hai na me gaaon me hun yaha net nhi aata?",
    created_date: new Date(),
  },
  {
    from: "John",
    to: "Divyam",
    msg: "To?",
    created_date: new Date(),
  },
  {
    from: "Divyam",
    to: "John",
    msg: "kya to net nhi hoga to padhunga kese?",
    created_date: new Date(),
  },
  {
    from: "Divyam",
    to: "Mahi",
    msg: " I like you Mahi ♥",
    created_date: new Date(),
  },
  {
    from: "Mahi",
    to: "Divyam",
    msg: " I like you Too Divyam ♥",
    created_date: new Date(),
  },
  {
    from: "Gulshan",
    to: "Divyam",
    msg: "Congratulation and celebration Mahi ne Divyam ko Haa boldiya",
    created_date: new Date(),
  },
  {
    from: "Divyam",
    to: "Gulshan",
    msg: "saale mere sapne kharab krdiya",
    created_date: new Date(),
  },
];

Chat.insertMany(allChat);
