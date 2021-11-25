//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "emojis",
    category: "general",
    description: "Shows the emojis of the server ",
    timeout: 3000,
    allow: "all",
    run: async (bot, message) => {
        //code
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        message.guild.emojis.cache.forEach((emoji) => {
            OverallEmojis++;
            if (emoji.animated) Animated++;
            else EmojiCount++;
        });
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Emojis in ${message.guild.name}.`)
            .setDescription(`**All Emojis of the server **` + `${OverallEmojis}`)
            .addField(`**Animated Emojis**`, `${Animated}`, true)
            .addField("Standard Emojis**", `${EmojiCount}`, true)
            .setColor(`ORANGE`);
        message.channel.send(Embed);
    }
}