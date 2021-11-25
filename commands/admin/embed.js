//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "announcement",
    aliases: ["announce"],
    category: "admin",
    description: "Make announcements for your server.",
    args: "<channel> [title] | [description] | [footer] | [image] | [author] | [color] | [timestamps : true or false]",
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
        },
        {
            name: "author",
            required: false,
            type: 6,
            description: "The author of the embed"
        },
        {
            name: "color",
            required: false,
            type: 3,
            description: "The color of the embed"
        },
        {
            name: "timestamps",
            required: false,
            type: 5,
            description: "Embed should have timestamps?"
        },
    ],
    permissions: [],
    allow: "admin",
    run: async (client, message, args) => {

        let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if (!channel) return message.reply("Inavlid channel was provided");

        args.shift();

        let embed = new Discord.MessageEmbed().setColor(args.get("color") || args[5]);

        if (args.get) {
            if (args.length === 0) return interaction.followUp("Please provided at least one of the arguments");

            if (args.get("title")) embed.setTitle(args.get("title"))
            if (args.get("description")) embed.setTitle(args.get("description"))
            if (args.get("footer")) embed.setTitle(args.get("footer"))
            if (args.get("image")) embed.setTitle(args.get("image"))
            if (args.get("timestamps") == true) embed.setTimestamp()
            if (args.get("author")) embed.setAuthor(message.mentions.members.first()?.user?.username, message.mentions.members.first()?.user?.displayAvatarURL({ dynamic: true }), message.mentions.members.first()?.user?.displayAvatarURL({ dynamic: true }))
        } else {
            if (args.length === 0) return message.reply("Please provided at least one of the arguments");

            args = args.join(" ").split("|");
            let user = message.guild.members.cache.get(args[4])?.user || message.mentions.members.first()?.user || message.guild.members.cache.get(args[4].substring(3, args[4].length - 1))?.user;

            if (args[0]) embed.setTitle(args[0]);
            if (args[1]) embed.setDescription(args[1]);
            if (args[2]) embed.setFooter(args[2]);
            if (args[3]) embed.setImage(args[3]);
            if (user) embed.setAuthor(user.username, user.displayAvatarURL({ dynamic: true }), user.displayAvatarURL({ dynamic: true }))
            if (args[6] == true) embed.setTimestamp()
        }

        channel.send({ embeds: [embed] }).then(v => { if (!message.replied) message.reply("embed sent"); else message.followUp("embed sent") }).catch(v => { if (!message.replied) message.reply("unable to send embed"); else message.followUp("unable to send embed sent") })
    }
}