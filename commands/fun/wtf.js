const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");

module.exports = {
    name: "wtf",
    description: "Say WTF!",
    category: "fun",
    allow: "all",
    timeout: 5000,
    run: async (bot, message,) => {
        const Embed = new MessageEmbed().setColor("BLUE").setDescription("Finding a nice thing which can make you say WTF")
        message.channel.send({ embeds: [Embed] })
            .then(async (msg) => {
                let data = await api.advanced("wtf");
                while (!data.img) data = await api.advanced("wtf");

                Embed.setTitle(data.title).setFooter(`⬆ ${data.upvotes} ⬇ ${data.downvotes}`).setImage(data.img).setColor("RANDOM");
                msg.edit({ embeds: [Embed] });
            })
    },
};