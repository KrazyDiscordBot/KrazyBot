require('dotenv').config();

const KrazyBot = require('./utility/client');
const Discord = require("discord.js");

const myIntent = new Discord.Intents(Discord.Intents.ALL);
myIntent.remove(['DIRECT_MESSAGE_TYPING', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_INTEGRATIONS']);

new KrazyBot({ partials: ["REACTION", "MESSAGE"], intents: myIntent }).on("messageUpdate");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch((e) => console.log(e));

const app = require("express")();

app.get('/', (req, res) => res.send(200));

app.listen(process.env.PORT || 3000);