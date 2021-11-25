const Discord = require("discord.js");
const NekoClient = require("nekos.life");
const api = new NekoClient();

module.exports = {
    name: "owoify",
    description: "OwOify some text",
    category: "fun",
    allow: "all",
    args:"<text>",
    options:[{
        name:"text",
        description:"The text which you want to owoify",
        required:true,
        type:3
    }],
    timeout: 5000,
    run: async (bot, message, args) => {
        let owoify = await api.sfw.OwOify({text:args.join(" ")});

        let embed = new Discord.MessageEmbed().setTitle(owoify.owo || owoify.msg).setColor("ORANGE");

        message.channel.send({embeds:[embed]});
    }
}