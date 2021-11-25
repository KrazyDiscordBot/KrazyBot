//require stuff
const Discord = require("discord.js");
const { botModel } = require('../../models');

//export
module.exports = {
    name: "botsuggest",
    allow: "all",
    category: "bot",
    aliase: ["botsuggestion", "bsuggest"],
    description: "You can suggestion a issue about the krazy bot via this command",
    args: "<suggestion>",
    options: [{
        name: "suggestion",
        description: " the suggestion which you want to send",
        type: 3,
        required: true
    }],
    timeout: 5000,
    run: async (bot, message, args, serverDB, b, userDB) => {
        //code
        if (serverDB.ban.comp || userDB?.ban?.sug) return message.channel.send({ embeds: [{ color: "RED", title: "STOP IT KID", description: "Because of false suggestions or spamming suggestion you/this server have been banned from using this command, If you think this ban is wrong than apply for unban [here](https://discord.gg/MqJgXQG)" }] });

        let suggestion = args.slice(0).join(" ");

        if (!suggestion) return message.channel.send({ embeds: [{ color: "RED", title: "❌ You didn't specified the suggestion", description: "Please speicfy a legit suggestion" }] });

        let embedPrivate = new Discord.MessageEmbed().setTitle("New Suggestion").setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.author.displayAvatarURL({ dynamic: true })).setColor("BLUE").setDescription("**Suggestion :**\n" + suggestion).addField("Status", "Pending <a:load:761466617132875796>", true).addField("Guild", message.guild.name + " | " + message.guild.id, true).addField("From", message.author.username + " | " + message.author.id, true).setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter("Suggested at ");
        let pChannel = await bot.channels.cache.get("743038080944046111"), ppChannel = bot.channels.cache.get("770918095242002432");

        pChannel.send({ embeds: [{ color: "RED", title: "New suggestion", description: suggestion }] });
        message.channel.send({ embeds: [{ color: "GREEN", title: "✅ Suggestion Sent to the developer successfully" }] });
        let kool = await ppChannel.send({ embeds: [embedPrivate] });

        embedPrivate.addField("Suggestion ID", "```" + kool.id + "```", true);
        kool.edit(embedPrivate);

        let db = await botModel.findOne({ id: "0" }) || botModel.create({ id: "0" });
        db.suggestion.push({ id: kool.id, guild: message.guild.id, channel: message.channel.id, at: Date.now(), user: message.author.id, status: "review" });
        botModel.findOneAndUpdate({ id: "0" }, { suggestion: db.suggestion });
    }
}