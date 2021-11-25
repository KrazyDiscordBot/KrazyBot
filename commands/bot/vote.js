//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "vote",
    category: "bot support",
    description: "Shows the voting link",
    usage: "k!vote",
    allow: "all",
    timeout: 3000,
    perms: "\`Embed Links\`",
    note: "No special permissions are required by user",
    reply: "Sadly you have a timeout , You can use this command once in **3** second, Right now you have to wait for **leftt",
    run: async (bot, message) => {
        //code
        let e = new Discord.MessageEmbed()
            .setTitle("**Krazy Bot Vote**")
            .setColor("RANDOM")
            .setDescription("**__[Astro Vote](https://botlists.com/bot/743834886833438770/vote)__**\n**__[Discord Boats](https://discord.boats/bot/743834886833438770/vote)__**")
        message.channel.send(e);
    }
}