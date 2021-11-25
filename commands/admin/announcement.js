//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "announcement",
    aliases: ["announce"],
    category: "admin",
    description: "Make announcements for your server.",
    args: "<channel> [title] | [description] | [footer] | [image]",
    timeout: 15000,
    options: [
        {
            name: "channel",
            type: 7,
            required: true,
            description: "The channel to send embed in"
        }, {
            name: "title",
            type: 3,
            required: false,
            description: "The title of the embed"
        },
        {
            name: "description",
            type: 3,
            required: false,
            description: "The description of the embed"
        },
        {
            name: "footer",
            type: 3,
            required: false,
            description: "The footer of the embed"
        }, {
            name: "image",
            type: 3,
            required: false,
            description: "The image of the embed"
        }
    ],
    permissions: [],
    allow: "admin",
    run: async (client, message, args) => {

        let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if (!channel) return message.reply("Inavlid channel was provided");

        args.shift();

        let embed = new Discord.MessageEmbed();

        if (args.get) {
            if (args.length === 0) return interaction.followUp("Please provided at least one of the arguments");
            if (args.get("title")) embed.setTitle(args.get("title"))
            if (args.get("description")) embed.setTitle(args.get("description"))
            if (args.get("footer")) embed.setTitle(args.get("footer"))
            if (args.get("image")) embed.setTitle(args.get("image"))
        } else {
            if (args.length === 0) return message.reply("Please provided at least one of the arguments");

            args = args.join(" ").split("|");
            if (args[0]) embed.setTitle(args[0]);
            if (args[1]) embed.setDescription(args[1]);
            if (args[2]) embed.setFooter(args[2]);
            if (args[3]) embed.setImage(args[3]);
        }

        channel.send({ embeds: [embed] }).then(v => { if (!message.replied) message.reply("embed sent"); else message.followUp("embed sent") }).catch(v => { if (!message.replied) message.reply("unable to send embed"); else message.followUp("unable to send embed sent") })
    }
}