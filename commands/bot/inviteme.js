//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "binv",
    aliases: ["invitelink", "invite"],
    category: "bot support",
    description: "Invite me in your server",
    timeout: 5000,
    perms: "\`Embed Links\`",
    allow: "all",   
    run: async (bot, message) => {
        //code
        let e = new Discord.MessageEmbed()
            .setTitle("**Krazy Bot Invite**")
            .setColor("RANDOM")
            .setDescription("[Click Here](https://botlists.com/bot/743834886833438770/invite)")
        message.channel.send({embeds:[e]});
    }
}