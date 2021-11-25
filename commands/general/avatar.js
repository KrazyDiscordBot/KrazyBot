//require stuff
const Discord = require("discord.js");
const Emojis = Object.values(require('../../utility/emojis'));

//export
module.exports = {
    name: "avatar",
    aliases: ["av", "pfp", "icon"],
    category: "general",
    allow: "all",
    description: "Shows the avatar ",
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "Userwho's avatar you wanna see"
    }],
    timeout: 5000,
    run: async (bot, message, args) => {
        //code
        let user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username == args.join(" ")) || message.guild.members.cache.find((m) => m.nickname == args.join(" ")) || message.mentions.members.first() || message.member;
        let embed = new Discord.MessageEmbed()
            .setFooter('Hey it is preety good')
            .setColor("RANDOM")
            .setImage(user.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setTitle(`${user.user.username}\'s Avatar`)
        message.channel.send(embed).then(async msg => {
            for (let i = 0; i < 2; i++)await msg.react(Emojis[Math.floor(Math.random() * Emojis.length)]);
        });
    }
}