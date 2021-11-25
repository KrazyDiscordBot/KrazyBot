const Discord = require("discord.js");
const NekoClient = require("nekos.life");
const api = new NekoClient();

module.exports = {
    name: "pat",
    description: "Get a pat GIF",
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
        let embed = new Discord.MessageEmbed().setTitle("Finding pat gifs").setColor("BLURPLE");
        message.channel.send({ embeds: [embed] }).then(async _msg_ => {
            embed.setImage((await api.sfw.pat()).url).setTitle(`${message.author.username} patting ${message.mentions.members.first()?.user.username || bot.user.username}`).setColor("RANDOM");
            _msg_.edit({ embeds: [embed] });
        })
    }
}