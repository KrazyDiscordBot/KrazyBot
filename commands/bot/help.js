//require
const Discord = require("discord.js");
const colors = ["LUMINOUS_VIVID_PINK", "NAVY", "FUCHSIA", "DARK_BUT_NOT_BLACK", "DARK_ORANGE"]
const ms = require("ms");

//export
module.exports = {
    name: "help",
    aliases: ["commands"],
    category: "bot support",
    description: "Shows Bot commands and other required stuff",
    options: [{
        name: "module",
        type: 3,
        required: false,
        description: "All for command name, Category for all category or a command name",
    }],
    args:"[module]",
    timeout: 1000,
    allow: "all",
    run: async (bot, message, args, serverDB) => {
        //code
        let option = args[0]?.toLowerCase(), prefix = serverDB.basicConfig.prefix;

        if (!option) {
            let embed = new Discord.MessageEmbed().setColor("GOLD").setTitle("Krazy Help Menu").setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true })).setFooter("[] are optional, <> are required").addFields([
                { name: "All commands", value: `${prefix}help all`, inline: true },
                { name: "All Categories", value: `${prefix}help category`, inline: true },
                { name: "Command's Info", value: `${prefix}help <Command Name>`, inline: true },
                { name: "List of Category Commands", value: `${prefix}help <Category Name>`, inline: true },
                { name: "Report Issue", value: `${prefix}report`, inline: true },
                { name: "Suggest Something", value: `${prefix}botsuggest`, inline: true },
            ])
                .addField(`**Support**`, `**__[Click Here](https://discord.gg/ZWHb6sR)__**`, true)
                .addField(`**Invite Bot**`, `**__[Click Here](https://botlists.com/bot/743834886833438770/invite)__**`, true)
                .addField(`**Vote For Me**`, `**__[Astro Vote](https://botlists.com/bot/743834886833438770/vote)__**\n**__[Discord Boats](https://discord.boats/bot/743834886833438770/vote)__**`, true)

            message.reply({ embeds: [embed] });
        } else if (option === "category") {
            message.channel.send({ embeds: [{ color: "DARK_GOLD", title: "All available categories", description: bot.categories.join(", ") }] })
        } else if (option === "all") {

        } else {
            let embeds = [], command = isCommand(bot, message, option,prefix), category = isCategory(bot, option);

            if (command) embeds.push(command);
            if (category) embeds.push(category);

            if (embeds.length === 0) embeds.push({ color: "RED", title: "No command or category found with this name" });

            message.channel.send({ embeds: embeds });
        }
    }
}

function isCommand(bot, message, command,prefix) {
    command = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command.toLowerCase()));

    if (!command || (command.hidden && message.author.id !== bot.owner && !bot.team.some(v => v === message.author.id))) return undefined;
    let embed = new Discord.MessageEmbed().setColor(colors[Math.floor(Math.random() * colors.length)]).setTitle("Krazy Help Menu").setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true })).setFooter("[] are optional, <> are required").addFields([
        { name: "Command Name", value: command.name, inline: true },
        { name: "Command Aliases", value: command.aliases?.join(" , ") || "No Aliases", inline: true },
        { name: "Command Description", value: command.description, inline: true },
        { name: "Command Cooldown", value: ms(command.timeout), inline: true },
        { name: "Command Usage", value: `${prefix}${command.name} ${command.args || ""}`, inline: true },
        { name: "Command Permission", value: getPermission(command.allow, command.permissions), inline: true },
    ]);

    return embed;
}

function isCategory(bot, category) {
    if ((category === "team" || category === "devloper") && (message.author.id !== bot.owner && !bot.team.some(v => v === message.author.id))) return undefined;

    let commands = [];
     bot.commands.filter(v => v.category === category).forEach(v=>commands.push(v.name))

    let embed = new Discord.MessageEmbed().setColor(colors[Math.floor(Math.random() * colors.length)]).setTitle(`${category}'s Commands List`).setDescription(commands.join(", "))

    return commands.length === 0 ? undefined : embed;
}

function getPermission(allow, perms) {
    if (allow === "all") return "Anyone can use this command";
    else if (allow === "admin") return "Only Users with Admin role or Administrator/Manage Server permission can use this command"
    else if (allow === "mod") return "Only Users with Moderator/Admin role or one of these permissions " + perms.join(" , ");
    else if (allow === "owner") return "Only Users with Administrator/Manage Server permission can use this command";
    else if (allow === "team") return "Only Users who are part of krazy team can use this command";
    else if (allow === "dev") return "Only Shisui can use this command";
    else return "Anyone can use this command";
}