//require stuff
const { serverUserModel } = require("../../models");

//export
module.exports = {
    name: "afk",
    aliases: ["setafk"],
    category: "general",
    allow: "all",
    description: "Sets you as afk",
    timeout: 20000,
    args: "[reason]",
    run: async (bot, message, args, serverDB, serverUserDB) => {
        //code
        if (serverUserDB.afk.afk) return message.reply({ embeds: [{ color: "RED", title: "You are already AFK <:afk5:730045459925696592>" }] });

        serverDB.afk = {
            afk: true,
            from: Date.now(),
            reply: args.join(" ") || "No reason",
            mentions: 0,
        }

        serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { afk: serverDB.afk });

        message.reply({ embeds: [{ color: "RANDOM", title: "You are now AFK", description: `<:afk5:730045459925696592> Reason : ${args.join(" ") || "No reason"}` }] })
    }
}