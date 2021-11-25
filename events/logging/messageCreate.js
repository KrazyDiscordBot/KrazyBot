const Discord = require('discord.js'),
    { guildData, guildMember, userData, getPower, getOptions } = require('../utility'),
    { commandModel, serverModel, serverUserModel, userModel } = require('../models'),
    ms = require('ms'),
    allowed = require('../utility/isAllowed');

/**
* 
* @param {Discord.CLient} client 
* @param {Discord.Message} message 
* @param {guildData} serverDB 
* @param {userData} userDB 
* @param {guildMember} serverUserDB 
*/
module.exports = async (client, message, serverDB, userDB, serverUserDB) => {
    // Getting the data
    try {
        serverDB = await serverModel.findOne({ id: message.guildId }) || await serverModel.create({ id: message.guildId });
        userDB = await userModel.findOne({ id: message.author.id }) || {};
        serverUserDB = await serverUserModel.findOne({ userID: message.author.id, guildID: message.guildId }) || {};
    } catch (e) {
        console.log(e);
    }

    // Rejecting for some reasons
    if (message.author.bot == true || !message.content.toLowerCase().startsWith(serverDB.basicConfig.prefix) || message.channel.type === "DM" || serverUserDB.Ban === true || serverDB.ban === true || userDB.ban === true || serverDB.basicConfig.break === true || serverDB.basicConfig.breakChannel.some(v => v === message.channelId)) return;

    // Finding the command than rejecting if not found
    let args = message.content.substring(2, message.content.length).toLowerCase().split(/ /g), _command = args.shift(), command = client.commands.get(_command) || client.commands.get(client.aliases.get(client.commands.get(_command)));

    if (!_command || !command) return;

    // Checking for disability of the command
    if (!allowed(message.member, message.channel, _command, serverDB)) return message.reply({ embeds: [{ color: "DARK_RED", title: "Sorry this command is disabled in this server" }] });

    // Checking for timeout
    let timeout = await commandModel.find({ command: _command, user: message.author.id, guild: message.guild.id }).sort({ time: -1 }).limit(1);

    if (timeout[0] && timeout[0].time > Date.now() - command.timeout) return message.reply({ embeds: [{ color: "DARK_RED", title: "Stop it get some help", description: `${message.author.username} You are on timeout to use ${_command} command for ${ms(Date.now() - timeout[0].time)}` }] });

    // Checking if bot have enough permissions
    if (command.permissions?.some(v => !message.guild.me.permissions.toArray().includes(v))) return message.reply({ embeds: [{ color: "RED", title: "I donot have enough permissions to run this command", description: `I need these permissions to use this command ${command.permissions.join(", ")}` }] })

    // Check usage permissions
    let power = getPower(serverDB, message.member, command.permissions), run = false;

    if (command.allow === "all") run = true;
    else if (command.allow === "mod" && power > 0) run = true;
    else if (command.allow === "admin" && power > 1) run = true;
    else if (command.allow === "owner" && power > 2) run = true;
    else if (command.allow === "dev" && !message.author.id === "441943765855240192") run = undefined;
    else if (command.allow === "dev" && message.author.id === "441943765855240192") run = true;
    else if (command.allow === "team" && !bot.team?.some(v => message.author.id === v)) run = undefined;
    else if (command.allow === "team" && bot.team?.some(v => message.author.id === v)) run = true;
    else run = true;

    if (run === undefined) return;
    else if (run === false) return message.reply({ embeds: [{ color: "DARK_RED", title: "NO YOU", description: `${message.author.username}, You do not have enough permissions to use ${_command} command` }] });

    // Checking arugments
    let reqArgs = getOptions(command.args || "").filter(v => v.required === true).length;
    if (reqArgs > args.length) return message.reply({ embeds: [{ color: "DARK_RED", title: "Invalid Syntax! Baka", description: `Correct Syntax : ${serverDB.basicConfig.prefix}${command.name} ${command.args}` }] });

    command.run(client, message, args, serverDB, serverUserDB, userDB || undefined);

    commandModel.create({ command: _command, user: message.author.id, guild: message.guild.id, time: message.createdAt });
}