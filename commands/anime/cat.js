const Discord = require("discord.js");
const NekoClient = require("nekos.life");
const api = new NekoClient();

module.exports = {
    name: "cat",
    description: "Get a cat GIF",
    category: "anime",
    allow: "all",   
    timeout: 8000,
    run: async (bot, message, args) => {
        let embed = new Discord.MessageEmbed().setTitle("Finding cat gifs").setColor("BLURPLE");
        message.channel.send({ embeds: [embed] }).then(async _msg_ => {
            embed.setImage((await api.sfw.meow()).url).setTitle(`Kawai cat xD 😳`).setColor("RANDOM");
            _msg_.edit({ embeds: [embed] });
        })
    }
}