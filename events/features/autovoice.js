const Discord = require('discord.js');
const { guildData } = require("../../utility");
const { serverModel } = require('../../models');

/**
 * 
 * @param {Discord.VoiceState} oldMember
 * @param {Discord.VoiceState} newMember
 * @param {guildData} serverDB 
 */
module.exports = async (oldMember, newMember, serverDB) => {
    if (!oldMember.guild.me.permissions.has("MANAGE_CHANNELS")) return;

    let autoChannel = serverDB.autoChannel;

    // when user joins a channel/switches the channel
    if (newMember.channel) {
        // Creating Automatic channel
        autoChannel.forEach((v, i) => {
            if (v.id !== newMember.channelId) return;

            if (newMember.member.user.bot) {
                return newMember.disconnect("Bots not allowed in Auto Voice channel");
            }

            v.name = v.name.replace(/{username}/g, message.author.username);
            v.name = v.name.replace(/{index}/g, v.channels.length);

            newMember.channel.clone({ name: v.name }).then(ch => {
                autoChannel[i].channels.push(ch.id);
                newMember.setChannel(ch, "Auto Channel creation");
                serverModel.findOneAndUpdate({ id: newMember.guild.id }, { autoChannel: autoChannel });
            })
        });

        // Adding Automatic Role
        serverDB.autoRole.voiceRole.forEach(v => {
            if (v.channel === newMember.channelId) newMember.member.roles.add(newMember.guild.roles.cache.get(v.role)).catch((e) => { });
        })
    }

    // When user leaves the voice channel 
    if (oldMember.channel) {
        // Removing Automatic channel
        autoChannel.forEach((v, i) => {
            if (v.channels.some(v => v === oldMember.channelId)) {

                let length = 0;
                oldMember.channel.members.filter(m => !m.user.bot).forEach(() => length++)

                if (length === 0) {
                    oldMember.channel.delete("Auto channel was deleted because it was empty");
                    autoChannel[i].channels = autoChannel[i].channels.filter(v => v !== oldMember.channelId);
                    serverModel.findOneAndUpdate({ id: newMember.guild.id }, { autoChannel: autoChannel });
                }
            }
        });

        // Removing Automatic Role
        if (v.channel !== newMember.channelId && v.channel === oldMember.channelId) newMember.member.roles.remove(newMember.guild.roles.cache.get(v.role)).catch((e) => { });
    }
}