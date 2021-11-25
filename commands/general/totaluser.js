//required stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "totaluser",
    allow: "all",
    aliases: ["users", "members"],
    category: "general",
    description: "Shows the role info",
    args: "<role>",
    options: [{
        name: "role",
        type: 8,
        required: true,
        description: "The role"
    }],
    timeout: 10000,
    run: async (bot, message, args) => { 
        //code
        let role = message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.mentions.roles.first();

        if (!role) message.reply({ embeds: [{ color: "RED", title: "Please provide a valid role" }] })

        let membersWithRole = message.guild.roles.cache.get(role.id).members.map(m => `**${m.user.username}** `);
        let role2 = [];
        let neww = [];
        let doo = 0;
        if (membersWithRole.length > 69) {
            doo++;
            for (let i = 70; i <= membersWithRole.length - 1; i++) {
                if (role2.length <= 69) {
                    if (role2.length <= 68) {
                        role2.push(membersWithRole[i])
                    } else {
                        role2.push("And more . . .")
                    }
                }
            }
            for (let i = 0; i <= 69; i++) {
                neww.push(membersWithRole[i])
            }
        }
        if (doo >= 1) {
            membersWithRole = neww;
        }
        let EMBED = new Discord.MessageEmbed()
            .setTitle("User with " + role.name + " role")
            .setColor('RANDOM')
            .setDescription(`${membersWithRole}`)
        let EMBED2 = new Discord.MessageEmbed()
            .setTitle("User with " + role.name + " role")
            .setColor('RANDOM')
            .setDescription(`${role2.length != 0 ? role2.join(",") : "No more Users have this role"}`)
        const pages = role2.length > 1 ? [EMBED, EMBED2] : [EMBED];
        bot.pagination(message, pages);
    }
}