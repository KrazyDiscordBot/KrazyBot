// dependecnies
const Discord = require('discord.js');
const google = require('google-it');
google.disableConsole = true;

// Exporting Module

module.exports = {
    name: "google",
    category: "other",
    description: "Search something on google from discord :D",
    args: "<query>",
    timeout: 5000,
    allow: 'all',
    aliases: ["search"],
    run: async (bot, message, args) => {
        let e = bot.emojis.cache.get("761466617132875796").toString()
        let q = args.join(" ");
        if (!q) return message.reply({}, { embed: { description: "You didnt provided a query! `Correct usage k!google something which you wanna search`" } })
        let j = new Discord.MessageEmbed().setColor("RANDOM").setDescription("Searching " + e).setFooter("Be Patient <3", "https://cdn.discordapp.com/attachments/814009062219317318/841624861595271198/google-logo-9824.png")
        message.channel.send({ embeds: [j] }).then((mms) => {
            google({ 'query': q }).then((r) => {
                if (r == undefined || r.length === 0) {
                    j.setColor("RED").setFooter("", "").setDescription("Sorry no results found !");
                    mms.edit(j);
                } else {
                    mms.delete();
                    let pages = [];
                    for (let i = 0; i < r.length; i++) {
                        let a = new Discord.MessageEmbed().setColor("GREEN").setDescription(r[i].snippet).setURL(r[i].link).setTitle(r[i].title);
                        pages.push(a);
                    }
                    bot.pagination(message, pages)
                }
            }).catch((e) => {
                j.setColor("RED").setFooter("", "").setDescription("Sorry no results found !");
                mms.edit(j);
            })
        })
    }
}