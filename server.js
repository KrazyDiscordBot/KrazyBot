require('dotenv').config();

const KrazyBot = require('./utility/client');
const Discord = require("discord.js");

new KrazyBot({ partials: ["REACTION", "MESSAGE"], intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES"] })

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch((e) => console.log(e));