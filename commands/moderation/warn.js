// dependecnies
const Discord = require('discord.js');
const { serverUserModel } = require('../../models');

// Exporting _module
module.exports = {
    name: "warning",
    category: "moderation",
    description: "Warn a Server Member or Moderator or even the admin or the owner lol",
    args: "<add | remove | list> <mention a user | User ID | Username> [reason]",
    options: [
        { name: "module", required: true, type: 3, description: "The warning module you wanna use", choices: [{ name: "Add a warning", value: "add" }, { name: "Remove a warning", value: "remove" }, { name: "Check warnings", value: "list" }] },
        { name: "user", required: true, type: 6, description: "The user who's warning module you wanna access" },
        { name: "reason", required: false, type: 3, description: "Reason for adding/remove warn" }
    ],
    timeout: 5000,
    allow: 'mod',
    permissions: [],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args, serverDB) => {
        const _module = args[0].toLowerCase(), user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find((u) => (u.user.username.toLowerCase() == args[1].toLowerCase() || u.nickname.toLowerCase() == args[1].toLowerCase())), reason = args.slice(2).join(" ") || "No reason was provided", data = serverUserModel.findOne({ userID: user.id, guildID: message.guildId });

        if (_module !== "add" && _module !== "remove" && _module !== "list") return message.channel.send({ embeds: [{ title: "Invalid _module", description: `Correct usage :${serverDB.prefix}${_module.exports.name} ${_module.exports.args}`, color: 'RED' }] });
        if (!user) return message.channel.send({ embeds: [{ title: "User not found", description: "Please mention an user or give their id to ban them", color: 'RED' }] });

        if (_module === "list") {
            let embeds = [];

            if (data.warn.length === 0) return message.reply({ embeds: [{ color: "GREEN", title: "What an Nice guy, cause they have warnings" }] })

            for (let i = 0; i < data.warn.length; i++) {
                embeds[Math.floor(i / 10)] ? embeds[Math.floor(i / 10)].description += `\nID:${i} Moderator: ${data.warn[i].moderator}\n **Reason** : ${data.warn[i].reason}\n**Date** : ${data.warn[i].date}\n` : embeds.push({ color: "RANDOM", title: `${user.user.username}'n Warnings`, descriptions: `ID:${i} Moderator: ${data.warn[i].moderator}\n **Reason** : ${data.warn[i].reason}\n**Date** : ${data.warn[i].date}\n` })
            }

            bot.pagination(message, embeds);
        } else if (_module === "remove") {
            message.reply({ embeds: [{ color: "GOLD", title: "Give the warn ID which you want to remove", footer: "You can type `cancel` to cancel" }] });
            const collector = new Discord.MessageCollector(message.channel, { filter: (m) => m.author.id === message.author.id, time: 30000 });

            collector.on('collect', (msg) => collector.stop(msg.content));

            collector.on('end', (shit, reason) => {
                if (reason.toLowerCase() === "cancel") return message.reply({ embeds: [{ color: "GREEN", title: "✅ Successfully cancelled the command" }] });
                if (reason.toLowerCase() === "time") return message.reply({ embeds: [{ color: "RED", title: "You took way too much time to respond" }] });

                let index = parseInt(reason);

                if (!data.warn[index]?.moderator) return message.reply({ embeds: [{ color: "RED", title: "Invalid warning ID was provided" }] });

                data.warn = data.warn.filter((v, i) => i !== index);
                serverUserModel.findOneAndUpdate({ userID: user.id, guildID: message.guildId }, { warn: data.warn });

                message.reply({ embeds: [{ color: "GREEN", title: "✅ Successfully Removed Warning with ID : " + index }] });
            })
        } else if (_module === "add") {
            let date = new Date().toDateString();

            data.warn.push({ moderator: message.author.username, date: date, reason: reason });
            serverUserModel.findOneAndUpdate({ userID: user.id, guildID: message.guildId }, { warn: data.warn });

            message.reply({ embeds: [{ color: "GREEN", title: "✅ Successfully added Warning for : " + user.user.username }] });
            user.user.send({ embeds: [{ color: "RED", title: "New warning", description: `Reason : ${reason}`, fields: [{ name: "Server", value: message.guild.name, inline: true }, { name: "Moderator", value: message.author.username, inline: true }] }] });
        }
    }
}