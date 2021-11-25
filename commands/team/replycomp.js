//require stuff
const Discord = require("discord.js");
const { botModel } = require("../../models");

//export
module.exports = {
    name: "botcomplainreply",
    aliases: ["bcomplainreply", "bcr"],
    category: "team",
    description: "Answer Complains (bot)",
    args: "<complain-id>",
    hidden: true,
    allow: "team",
    timeout: 3000,
    run: async (bot, message, args) => {
        //code
        let id = args[0], botDB = await botModel.findOne({ id: 6969 }), index = -1, at = 0, dicison;
        botDB.complain.forEach((v, i) => { if (v.id === id) index = i });

        if (index === -1) return message.reply({ embeds: [{ color: "RED", title: "Invalid Complain ID" }] });

        let collector = new Discord.MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 1800000 });

        message.reply({ embeds: [{ color: "BLUE", description: "Type `approve` or `deny` or `cancel`" }] });

        collector.on('collect', (msg) => {
            if (msg.content.toLowerCase() === "cancel") collector.stop("cancel");
            if (at === 0) {
                if (msg.content.toLowerCase() !== "approve" && msg.content.toLowerCase() !== "deny") return msg.reply({ embeds: [{ color: "BLUE", description: "Type `approve` or `deny` or `cancel`" }] });
                at++;
                dicison = msg.content.toLowerCase();
                msg.reply({ embeds: [{ color: "BLUE", title: "Give reason in a single message" }] })
            } else if (at === 1) {
                collector.stop(msg.content);
            }
        });

        collector.on('end', async (m, reason) => {
            if (reason === "time") return message.reply({ embeds: [{ color: "RED", title: "You took way too much time to respond" }] });
            if (reason === "cancel") return message.reply({ embeds: [{ color: "GREEN", title: "Command cancelled successfully" }] });

            message.reply({ embeds: [{ color: "GREEN", title: "Complain reviewed successfully" }] })
            let msg = await message.guild.channels.cache.get("770918095242002432").messages.fetch(botDB.complain[index].id);

            msg.edit({ embeds: [{ color: "GOLD", title: "OLD Suggestion", description: msg.embeds[0].description, fields: [{ name: "User | Guild", value: `${botDB.complain[index].user} | ${botDB.complain[index].guild}`, inline: true }, { name: "Status", value: `${dicison}`, inline: true }, { name: "Moderator", value: `${message.author.id}`, inline: true }] }] })

            botDB.complain = botDB.complain.filter((v, i) => i !== index);
            botModel.findOneAndUpdate({ id: 6969 }, { complain: botDB.complain });
        })
    }
};