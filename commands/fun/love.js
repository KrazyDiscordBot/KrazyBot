const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "love",
    category: "fun",
    description: "Calculates the love affinity you have for another person.",
    args: "[mention the user]",
    options: [{
        name: "User",
        description: "The user who's love you wanna measure",
        type: 3,
        required: true
    }],
    timeout: 5000,
    allow: "all",
    reply: "You can find love rate once in **5** seconds, Right now you have to wait for **leftt**",
    perms: "\`Embed links\`",
    note: "No special perms are required by user",
    run: async (client, message, args) => {
        let person = message.mentions.members.first() || args.slice(0).join(" ");
        let love = Math.random() * 100;
        if (message.author.id == "441943765855240192") {
            if (message.content.toLowerCase().includes("gf") || message.content.toLowerCase().includes("girlfriend"))
                love = 100;
        }

        if (person.includes("shisui")) love = 100;

        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        let footers = [
            "Bruh! Are you guys for real? 🤔",
            "xD lol lameeeee 🤣",
            "Dude this aint Love 💤",
            "Dude even my haters don't hate me this much 😬",
            "Be strong dude , stuff happens ♥",
            "My mothers loves me less than this 🥺",
            "Aww its growing GG! 😏",
            "Now we are talking  😈",
            "Lovey Dovey 🕊",
            "DANG You guys are the real lovers 🤯"
        ];

        const embed = new MessageEmbed()
            .setTitle('LOVE RATE')
            .setColor("#ce08ad")
            .setDescription(`💟 **${person.displayName || person}** loves **${message.member.displayName}** 💟 this much:\n ${Math.floor(love)}%\n\n${loveLevel}`)
            .setFooter(footers[loveIndex - 1]);

        message.channel.send(embed);
    }
}