module.exports = {
    name: "pp",
    category: "fun",
    description: "Get thesize of someone's pp",
    options: [{
        name: "User",
        description: "the person who's pp's size you wanna check",
        type: 6,
        required: false
    }],
    args: "[mention the user]",
    timeout: 3000,
    allow: "all",
    perms: "\`Embed links\`",
    reply: 'what are you going to ad after measuring pp, You can measure pp once in **3** seconds, Right now you have to wait for **leftt**',
    note: "No special perms are required by user",
    run: async (bot, message, args, touse) => {
        //code
        const user = message.mentions.members.first()?.user || message.author,
            size = Math.floor(Math.random() * 21),
            show = "8" + "=".repeat(size) + ">",
            embed = new Discord.MessageEmbed()
                .setTitle(`${user.username}\'s PP`)
                .setDescription(show)
                .setColor("RANDOM")
        message.channel.send(embed)
    }
}