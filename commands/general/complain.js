// Required stuff
const { serverModel } = require('../../models')
const Discord = require('discord.js');
const getPower = require('../../utility/getPower');
serverModel.findOneAnd
//export
module.exports = {
    name: "complain",
    category: "general",
    description: "Send a complain to the server.",
    args: "<review | setup | complain> < complain ID | channel or disable | your complain >",
    timeout: 20000,
    options: [
        {
            name: "complain",
            type: 1,
            description: "The complain.",
            options: [{
                name: "complain",
                type: 3,
                required: true,
                description: "The complain you wanna send ti this server"
            }]
        },
        {
            name: "setup",
            type: 1,
            description: "Setup the complain module for your server",
            options: [{
                name: "channel",
                type: 3,
                required: true,
                description: "The channel where the complains will be sent or disable to disable"
            }]
        },
        {
            name: "review",
            type: 1,
            description: "Review complains of your server",
            options: [{
                name: "complain-id",
                type: 3,
                required: true,
                description: "The complain ID which you wanna review."
            }]
        }
    ],
    permissions: [],
    run: async (client, message, args, serverDB, b, c, interaction) => {
        const option = interaction?.options?._subcommand || args[0]?.toLowerCase();

        if (!option || (option !== "setup" && option !== "complain" && option !== "review")) return message.reply({ embeds: [{ color: "RED", title: "Invalid usage", description: `Correct usage : ${serverDB.basicConfig.prefix}${module.exports.name} complain your complain here \n\tor\n${serverDB.basicConfig.prefix}${module.exports.name} setup #channel` }] })

        if (option === "setup") {
            if (getPower(message.member, serverDB) < 2) return message.reply({ color: "RED", title: "You do not have enough permissions to use this module" });

            const type = interaction?.options?._subcommand ? args[0] : args[1];
            if (type.toLowerCase() === "disable") {
                await serverModel.findOneAndUpdate({ id: message.guild.id }, { "complain.at": "0" });
                message.reply({ embeds: [{ color: "GREEN", title: "Complain module disabled successfully" }] })
                return;
            }

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(interaction?.options?._subcommand ? args[0] : args[1]);

            if (!channel || (channel.type !== "GUILD_NEWS" && channel.type !== "GUILD_TEXT")) message.reply({ embeds: [{ color: "RED", title: "Invalid channel was provided, next time provide a text channel" }] });

            await serverModel.findOneAndUpdate({ id: message.guild.id }, { "complain.at": channel.id });

            message.reply({ embeds: [{ color: "GREEN", title: "Complain channel changed", description: `New channel : ${channel.toString()}` }] })
        } else if (option === "complain") {
            const channel = message.guild.channels.cache.get(serberDB.complain.at);
            if (!channel) return message.reply({ embeds: [{ color: "RED", title: "This server didn't setuped complain system", description: `Admins can setup the channel via ${serverDB.basicConfig.prefix}complain -setup` }] });

            let complain = args.join(" ");

            if (!complain) return message.reply({ embeds: [{ color: "RED", title: "You are supposed to give a complain too" }] });

            const embed = new Discord.MessageEmbed()
                .setTitle("New Complain")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }), message.author.displayAvatarURL({ dynamic: true }))
                .setColor("BLUE")
                .setDescription("**Complain :**\n" + complain)
                .addField("Status", "Pending <a:load:761466617132875796>", true)
                .addField("\u200b", "\u200b", true)
                .addField("From", message.author.username, true)
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setFooter("Complained at ")

            channel.send({ embeds: [embed] }).then(async msg => {
                message.reply({ embeds: [{ color: "GREEN", title: "✅ Complain was sent successfully" }] });

                embed.addField("Complain ID", `\`\`\`${msg.id}\`\`\``, true)
                msg.edit(embed);

                const complains = serverDB.complain.list || [];
                complains.push({ userID: message.author.id, complain, id: msg.id, channel: message.channel.id });

                await serverModel.findOneAndUpdate({ id: message.guild.id }, { "complain.list": complains });
            }).catch(e => {
                message.reply({ embeds: [{ color: "RED", title: "❌ index was unable to send the complain" }] });
            })
        } else {
            if (getPower(message.member, serverDB) < 2) return message.reply({ color: "RED", title: "You do not have enough permissions to use this module" });

            const id = interaction?.options?._subcommand ? args[0] : args[1];
            let complain = serverDB.complain.list?.filter(v => v.id === id);

            if (!complain) return message.reply({ color: "RED", title: "No complain was found with that ID or this complain is already reviewed" });

            let status = "", dm = false, reason = "no reason was provided", index = 0, z = 0;

            message.channel.send()
            const collector = message.channel.createMessageCollector({ filter: (m) => m.author.id === message.author.id, time: 300000 });

            collector.on('collect', (msg) => {
                if (msg.content.toLowerCase() === "cancel") {
                    return collector.stop("cancel");
                }

                if (index === 0) {
                    if (msg.content.toLowerCase() === "approve") status = "approve";
                    else if (msg.content.toLowerCase() === "deny") status = "deny";

                    if (status === "") {
                        if (z === 0) msg.delete().catch(E => { z++ });

                        msg.reply({ embeds: [{ color: "RED", title: "Either type `approve` or `deny`, You can type `cancel` to cancel this command" }] })
                        return;
                    }

                    index++;
                    _msg_.edit({ embeds: [{ color: "RANDOM", title: "Now give a reason in a single message." }] })
                } else if (index === 1) {
                    reason = msg.content;
                    index++;

                    _msg_.edit({ embeds: [{ color: "RANDOM", title: "Type `okay` to publish the review, `okay_` to publish the review + DM the complainer about it, `cancel` to cancel the review." }] })
                } else {
                    if (z === 0) msg.delete().catch(E => { z++ });

                    if (msg.content.toLowerCase() === "okay") dm = true;
                    else if (msg.content.toLowerCase() === "okay_") dm = false;
                    else {
                        msg.reply({ embeds: [{ color: "RED", title: "Either type `okay` or `okay_`, You can type `cancel` to cancel this command" }] });
                        return;
                    }

                    collector.stop("done");
                }
            });

            collector.on('end', async (shit, reason) => {
                if (reason === "time") return message.reply({ embeds: [{ color: "RED", title: "You took too much time to respond" }] });
                if (reason === "cancel") return message.reply({ embeds: [{ color: "GREEN", title: "Command cancelled successfully" }] });

                serverDB.complain.list = serverDB.complain.list.filter(v => v.id !== id);
                await serverModel.findOneAndUpdate({ id: message.guild.id }, { "complain.list": serverDB.complain.list });

                const message = message.guild.channels.cache.get(complain.channel)?.messages.fetch(complain.id, true, true);

                if (message) {
                    let author = message.guild.members.cache.get(complain.userID)?.user || {};

                    const Embed = new Discord.MessageEmbed().setColor(choice == "deny" ? "RED" : "GREEN").setTimestamp().setFooter(choice == "deny" ? "Denied at " : "Approved at ")
                        .setDescription("**Complain : **\n" + msgdata.complain).addField("Status", choice == "deny" ? "Declined <:Cross:744161251743105035>" : "Approved (Fixed) <a:check:758863970551070741>", true).addField("Reviewed By", message.author.username, true).addField("Sender", author.username || "unknown", true).addField(choice == "deny" ? "Reason" : "Comment", reply, true);
                    if (author?.username) Embed.setAuthor(author.username, author.displayAvatarURL({ dynamic: true }), author.displayAvatarURL({ dynamic: true }));

                    message.edit({ embeds: [Embed] })
                }

                _msg_.edit({ embeds: [{ color: "GREEN", description: "Complain is " + status == "deny" ? "Declined" : "Approved" + "Successfully <a:check:758863970551070741>" }] });
            })
        }
    }
}