const Discord = require("discord.js");
const NekoClient = require("nekos.life");
const api = new NekoClient();

module.exports = {
    name: "nekoGif",
    description: "Get a nekoGif GIF",
    category: "anime",
    allow: "all",
    timeout: 8000,
    run: async (bot, message, args) => {
        let embed = new Discord.MessageEmbed().setTitle("Finding nekoGif gifs").setColor("BLURPLE");
        message.channel.send({ embeds: [embed] }).then(async _msg_ => {
            embed.setImage((await api.sfw.nekoGif()).url).setTitle(`Kawai Neko 😳`).setColor("RANDOM");
            _msg_.edit({ embeds: [embed] });
        })
    }
}