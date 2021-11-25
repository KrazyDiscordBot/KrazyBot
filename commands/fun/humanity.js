//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "humanity",
    aliases: ["humanrate"],
    category: "fun",
    description: "Shows human rate",
    args:"<Mention the User>",
    options: [{
        name: "User",
        description: "The user whom you want to hack",
        type: 6,
        required: false
    }],
    timeout: 3000,
    allow: "all",
    run: async (bot, message) => {
        //code
        let user = message.mentions.members.first()?.user || message.author;
        
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "👨".repeat(loveIndex) + "💀".repeat(10 - loveIndex);
        const embed = new Discord.MessageEmbed()
            .setTitle('HUMAN RATE')
            .setColor("RANDOM")
            .setDescription(`**${user.username}**\' human rate is:\n ${Math.floor(love)}%\n\u2001\u2001\u2001${loveLevel}`)
        message.channel.send(embed);
    }
}