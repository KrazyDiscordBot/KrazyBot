//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "support",
    category: "bot support",
    description: "Gives the support server link",
    usage: "k!support",
    allow:"all",
    timeout: 3000,
    perms: "\`Embed Links\`",
    note: "No special permissions are required by user",
    reply:"You have a timeout but ignore it [Click Here](https://discord.gg/xYytFy7) for support, Right now you have to wait for **leftt**",
    run: async (bot, message) => {
        //code
            let e = new Discord.MessageEmbed()
                .setTitle("**Krazy Bot Support**")
                .setDescription("**Support server** : [Click Here](https://discord.gg/ZWHb6sR)")
            message.channel.send({embeds:[e]});
    }
}