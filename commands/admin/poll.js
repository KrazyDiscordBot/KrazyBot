//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "poll",
    aliases: ["create-poll"],
    category: "admin",
    description: "Make Polls for your server.",
    args: "<channel> [question] | [number of options] | [footer] | [image]",
    timeout: 15000,
    options: [
        {
            name: "channel",
            type: 7,
            required: true,
            description: "The channel where you want to create the poll"
        }, {
            name: "question",
            type: 3,
            required: true,
            description: "The question of the poll"
        },
        {
            name: "options",
            type: 4,
            required: true,
            description: "The number of options"
        },
        {
            name: "footer",
            type: 3,
            required: false,
            description: "The footer of the poll"
        }, {
            name: "image",
            type: 3,
            required: false,
            description: "The image of the poll"
        }
    ],
    permissions: [],
    allow: "admin",
    run: async (client, message, args) => {

        const emojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
        const channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if (!channel || (channel.type !== "GUILD_TEXT" && channel.type !== "GUILD_NEWS")) return message.reply("Inavlid channel was provided");

        args.shift();

        let embed = new Discord.MessageEmbed().setTitle(args[0]).setFooter(args[2]).setImage(args[3]), option = parseInt(args[1]), options = [], description = "";

        if (!option || option < 2 || option > 26) return message.reply({ embeds: [{ color: "RED", title: "the options should be a number from 2 to 26" }] });

        message.reply({ embeds: [{ color: "RANDOM", title: `Now send ${option} options one by one` }] });

        const collector = message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 25000 * option });

        collector.on('collect', (msg) => {
            options.push({
                emoji: emojis.shift(),
                content: msg.content
            });

            if (options.length === option) collector.stop("done");
        });

        collector.on('end', (shit, reason) => {
            if (reason === "time") return message.reply({ embeds: [{ color: "RED", title: "You took to much time to respond" }] });

            options.forEach(v => description += `${v.emoji} : ${v.content}\n`);
            embed.setDescription(description);

            channel.send({ embeds: [embed] }).then(v => { if (!message.replied) message.reply("Poll crated successfully"); else message.followUp("embed sent") }).catch(v => { if (!message.replied) message.reply("unable to send embed"); else message.followUp("unable to send embed sent") })
        })
    }
}