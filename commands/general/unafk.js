//require stuff
const { serverUserModel } = require("../../models");

//export
module.exports = {
    name: "unafk",
    aliases: ["setafk"],
    category: "others",
    allow: "all",
    description: "Sets you as unafk",
    timeout: 10000,
    run: async (bot, message, args, serverDB, serverUserDB) => {
        //code
        if (!serverUserDB.afk.afk) return message.reply({ embeds: [{ color: "RED", title: "You are not AFK <:afk5:730045459925696592>" }] });

        message.reply({ embeds: [{ color: "RANDOM", title: "You are no more AFK", description: `While you was AFK you got  ${serverUserDB.afk.mentions} mentions` }] })

        serverDB.afk = {
            afk: false,
            from: 0,
            reply: "",
            mentions: 0,
        }

        serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { afk: serverDB.afk });
    }
}