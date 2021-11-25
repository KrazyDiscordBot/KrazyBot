const Discord = require('discord.js'),
    { guildData, guildMember, userData, getPower } = require('../../../krazyfront_beta/utility'),
    { commandModel, serverModel, serverUserModel, userModel } = require('../../../krazyfront_beta/models'),
    ms = require('ms'),
    allowed = require('../../../krazyfront_beta/utility/isAllowed');

/**
* 
* @param {Discord.CLient} client 
* @param {Discord.Interaction} interaction 
* @param {guildData} serverDB 
* @param {userData} userDB 
* @param {guildMember} serverUserDB 
*/
module.exports = async (client, interaction, serverDB, userDB, serverUserDB) => {
    if (!interaction.isCommand()) return;

    const message = {
        author: interaction.user,
        member: interaction.member,
        guild: interaction.guild,
        guildId: interaction.guildId,
        channel: interaction.guild.channels.cache.get(interaction.channelId),
        channelId: interaction.channelId,
        content: `${interaction.commandName}`,
        mentions: {
            members: new Discord.Collection(),
            channels: new Discord.Collection(),
            roles: new Discord.Collection(),
        },
        createdAt: Date.now() - 100,
        reply: (options) => {
            options.content = `${interaction.user.toString()}` + options.content?.length > 0 ? ", " + options.content : " ";
            interaction.channel.send(options)
        }
    }

    // Getting the data
    serverDB = await serverModel.findOne({ id: message.guildId }) || await serverModel.create({ id: message.guildId });
    userDB = await userModel.findOne({ id: message.author.id }) || {};
    serverUserDB = await serverUserModel.findOne({ userID: message.author.id, guildID: message.guildId }) || {};

    // Finding the command than rejecting if not found
    let args = [], _command = interaction.commandName, command = client.commands.get(_command) || client.commands.get(client.aliases.get(client.commands.get(_command)));
    if (!_command || !command) return interaction.reply({ ephemeral: true, content: "Command not found, maybe this command is removed" });

    if (interaction.options._hoistedOptions && interaction.options._hoistedOptions.length > 0) interaction.options._hoistedOptions.forEach((v) => args.push(v.value))

    // Checking for disability of the command
    if (!allowed(message.member, message.channel, _command, serverDB)) return interaction.reply({ ephemeral: true, embeds: [{ color: "DARK_RED", title: "Sorry this command is disabled in this server" }] });

    // Checking if bot have enough permissions
    if (command.permissions?.some(v => !message.guild.me.permissions.toArray().includes(v))) return interaction.reply({ embeds: [{ color: "RED", title: "I donot have enough permissions to run this command", description: `I need these permissions to use this command ${command.permissions.join(", ")}` }] })

    // Checking for timeout
    let timeout = await commandModel.find({ command: _command, user: message.author.id, guild: message.guild.id }).sort({ time: -1 }).limit(1);

    if (timeout[0] && timeout[0].time > Date.now() - command.timeout) return interaction.reply({ ephemeral: true, embeds: [{ color: "DARK_RED", title: "Stop it get some help", description: `${message.author.username} You are on timeout to use ${_command} command for ${ms(Date.now() - timeout[0].time)}` }] });

    // Check usage permissions
    let power = getPower(serverDB, message.member), run = false;

    if (command.allow === "all") run = true;
    else if (command.allow === "mod" && power > 0) run = true;
    else if (command.allow === "admin" && power > 1) run = true;
    else if (command.allow === "owner" && power > 2) run = true;
    else if (command.allow === "dev" && message.author.id === "441943765855240192") run = undefined;
    else if (command.allow === "team" && bot.team?.some(v => message.author.id === v)) run = undefined;
    else run = true;

    if (run === undefined) return interaction.reply({ ephemeral: true, content: "Command not found, maybe this command is removed" });
    else if (run === false) return interaction.reply({ ephemeral: true, embeds: [{ color: "DARK_RED", title: "NO YOU", description: `${message.author.username}, You do not have enough permissions to use ${_command} command` }] });

    args.forEach(v => {
        let member = message.guild.members.cache.get(v);
        let channel = message.guild.members.cache.get(v);
        let role = message.guild.members.cache.get(v);

        if (member) message.mentions.members.set(member.id, member)
        if (role) message.mentions.roles.set(role.id, role)
        if (channel) message.mentions.channels.set(channel.id, channel)
    })

    interaction.reply({ ephemeral: true, content: "Command accepted" });

    command.run(client, message, args, serverDB, serverUserDB, userDB || undefined,interaction);

    commandModel.create({ command: _command, user: message.author.id, guild: message.guild.id, time: message.createdAt });
}