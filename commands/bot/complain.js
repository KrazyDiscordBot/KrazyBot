//require stuff
const Discord = require("discord.js");
const { botModel } = require('../../models');

//export
module.exports = {
    name: "report",
    allow: "all",
    category: "bot",
    aliase: ["botcomplain"],
    description: "You can complain/report a issue about the krazy bot via this command",
    args: "<complain>",
    options: [{
        name: "complain",
        description: " the complain which you want to send",
        type: 3,
        required: true
    }],
    timeout: 5000,
    run: async (bot, message, args, serverDB, b, userDB) => {
        //code/
        if (serverDB.ban.comp || userDB?.ban?.comp) return message.channel.send({ embeds: [{ color: "RED", title: "STOP IT KID", description: "Because of false complains or spamming complain you/this server have been banned from using this command, If you think this ban is wrong than apply for unban [here](https://discord.gg/MqJgXQG)" }] });

        let complain = args.slice(0).join(" ");

        if (!complain) return message.channel.send({ embeds: [{ color: "RED", title: "❌ You didn't specified the complain", description: "Please speicfy a legit complain/report" }] });

        let embedPrivate = new Discord.MessageEmbed().setTitle("New Complain").setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.author.displayAvatarURL({ dynamic: true })).setColor("BLUE").setDescription("**Complain :**\n" + complain).addField("Status", "Pending <a:load:761466617132875796>", true).addField("Guild", message.guild.name + " | " + message.guild.id, true).addField("From", message.author.username + " | " + message.author.id, true).setThumbnail(message.author.displayAvatarURL({ dynamic: true })).setTimestamp().setFooter("Complained at ");
        let pChannel = await bot.channels.cache.get("743038044306931762"), ppChannel = bot.channels.cache.get("770918095242002432");

        pChannel.send({ embeds: [{ color: "RED", title: "New complain fix it fest", description: complain }] });
        message.channel.send({ embeds: [{ color: "GREEN", title: "✅ Complain Sent to the developer successfully" }] });
        let kool = await ppChannel.send({ embeds: [embedPrivate] });

        embedPrivate.addField("Complain ID", "```" + kool.id + "```", true);
        kool.edit(embedPrivate);

        let db = await botModel.findOne({ id: "0" }) || botModel.create({ id: "0" });
        db.complain.push({ id: kool.id, guild: message.guild.id, channel: message.channel.id, at: Date.now(), user: message.author.id, status: "review" });
        console.log(await botModel.findOneAndUpdate({ id: "0" }, { complain: db.complain }, { new: true }));
    }
}