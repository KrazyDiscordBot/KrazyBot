//Required things
const { serverModel } = require('../../../krazyback/models');
const getPower = require('../../utility/getPower');
const finder = require('../../utility/linkfinder');

//export
module.exports = {
    name: "donate",
    category: "admin",
    description: "Donate to the server, in which you are using the command",
    args: "[ donation message ]",
    timeout: 10000,
    options: [
        {
            name: "message",
            description: "The text to show to the normal user, modify it with new text or type disable to disable this",
            type: 3,
            required: false
        }
    ],
    permissions: [],
    allow: "all",
    run: async (client, message, args, serverDB) => {
        if (args.length === 0 || (args.length > 0 && getPower(message.member, serverDB) === 0)) {
            if (serverDB.basicConfig.donate === "") {
                message.reply({ embeds: [{ color: "RED", title: "This server didn't setuped donation, mods can setup via `k!donate the url or the text`" }] })
                return;
            }
            let url = (await finder(serverDB.basicConfig.donate)).links[0];

            message.reply({ embeds: [{ color: "GOLD", url, title: `Donate to ${message.guild.name}`, description: serverDB.basicConfig.donate, footer: "These donations are sent to this server, krazy bot is not going to get any money you donated here" }] })
        } else {
            message.reply({ embeds: [{ color: "BLUE", title: "Type `yes` : to change donation text to new text, `no` to cancel this", description: `New text : \n${args.join(" ")}` }] });
            const collector = message.channel.createMessageCollector({ filter: msg => msg.author.id === message.author.id });

            collector.on('collect', (msg) => collector.stop(msg.content.toLowerCase()));

            collector.on('end',async (shit, reason) => {
                if (reason === "time") message.reply({ embeds: [{ color: "RED", title: "You took too much time to respond" }] });
                else if (reason === "no") message.reply({ embeds: [{ color: "GREEN", title: "Donation link not changed" }] });
                else if (reason === "yes") {
                    await serverModel.findOneAndUpdate({ id: message.author.id }, { "basicConfig.donate": args.join(" ") })
                    message.reply({ embeds: [{ color: "BLUE", title: "Donation text changed to new text", description: `New text : \n${args.join(" ")}` }] });
                }
            })
        }
    }
}