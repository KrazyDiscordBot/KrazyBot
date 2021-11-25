const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");

module.exports = {
    name: "meme",
    description: "Get a cool meme!",
    category: "fun",
    allow: "all",
    timeout: 5000,
    run: async (bot, message,) => {
        let subs = ["dankmemes", "memes", "Memes_Of_The_Dank", "funny", "bootleg_memes"];
        const Embed = new MessageEmbed().setColor("BLUE").setDescription("Finding a nice DadJOKE")
        message.channel.send({ embeds: [Embed] })
            .then(async (msg) => {
                let data = await api.advanced(subs[Math.floor(Math.random() * subs.length)]);
                while (!data.img) data = await api.advanced(subs[Math.floor(Math.random() * subs.length)]);

                Embed.setTitle(data.title).setFooter(`⬆ ${data.upvotes} ⬇ ${data.downvotes}`).setImage(data.img).setColor("RANDOM");
                msg.edit({ embeds: [Embed] });
            })
    },
};