// Required
const Discord = require("discord.js");
const axios = require("axios");
//export
module.exports = {
    name: "knowledge",
    aliases: ["fact"],
    category: "fun",
    description: "gives you some knowledge cause u need it",
    timeout: 3000,
    allow: "all",
    reply: "I know keed you need some knowledge but you can gain some knowledge once in **3** seconds, Right now you have to wait for **leftt**",
    perms: "\`Embed links\`",
    note: "No special perms are required by user",
    run: async (bot, message, args, touse) => {
        //code
        let url = "https://www.no-api-key.com/api/v1/facts";
        message.reply("oh so you want some knowledge").then(async(msg) => {
            let data = await axios.get(url)
            let dact = data.data.fact;
            let embed = new Discord.MessageEmbed()
                .setTitle("EPIC KNOWLEDGE")
                .setColor("RANDOM")
                .setDescription("\n\n" + dact)
            msg.edit({ embeds: [embed] })

        })
    }
}