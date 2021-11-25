const { MessageEmbed } = require("discord.js");
const api = require("imageapi.js");

module.exports = {
    name: "ameme",
    aliases: ["animememe"],
    description: "Get a anime meme!",
    category: "anime",
    allow: "all",
    timeout: 5000,
    run: async (bot, message,) => {
        const subreddits = ["JoJoMemes","dankruto", "anime_memes", "GreatestAnimeMemes", "Animemes", "goodanimememes", "MemePiece", "goodanimemes", "animememes"];

        const Embed = new MessageEmbed().setColor("BLUE").setTitle("Finding a nice Anime meme")
        message.channel.send({ embeds: [Embed] })
            .then(async (msg) => {
                let data = await api.advanced(subreddits[Math.floor(Math.random() * subreddits.length)]);
                while (!data.img) data = await api.advanced(subreddits[Math.floor(Math.random() * subreddits.length)]);

                Embed.setTitle(data.title).setFooter(`⬆ ${data.upvotes} ⬇ ${data.downvotes}`).setImage(data.img).setColor("RANDOM");
                msg.edit({ embeds: [Embed] });
            })
    },
};