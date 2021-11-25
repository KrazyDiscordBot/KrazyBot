const Discord = require("discord.js");
const NekoClient = require("nekos.life");
const api = new NekoClient();

module.exports = {
    name: "smug",
    description: "Get a smug GIF",
    category: "anime",
    allow: "all",
    args:"[user]",
    options:[{
        name:"user",
        description:"Mention the user",
        type:6,
        required:false
    }],
    timeout: 8000,
    run: async (bot, message, args) => {
        let embed = new Discord.MessageEmbed().setTitle("Finding smug gifs").setColor("BLURPLE");
        message.channel.send({ embeds: [embed] }).then(async _msg_ => {
            embed.setImage((await api.sfw.smug()).url).setTitle(`${message.author.username} Smugging`).setColor("RANDOM");
            _msg_.edit({ embeds: [embed] });
        })
    }
}