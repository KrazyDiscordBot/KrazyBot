module.exports = {
    name: "istrue",
    aliases: ["liedetector"],
    description: "check if something is not an lie or is it",
    category: "fun",
    allow: "all",
    args:"<the thing>",
    options: [{
        name: "the-thing",
        description: "The thing which's truth percatage you want to measure",
        type: 3,
        required: true
    }],
    timeout: 5000,
    reply: "You can use lie detector or maybe truth detector once in **5** seconds, Right now you have to wait for **leftt**",
    perms: "\`Embed links\`",
    note: "No special perms are required by user",
    run: async (bot, message) => {
        let a = Math.floor(Math.random() * 1 + 11);
        let p = Math.floor(Math.random()     * 101);

        if (a % 2 == 0) message.channel.send({ embdes: [{ embed: { description: "It is " + p + "% true!", color: "GREEN" } }] })
        else message.channel.send({ embdes: [{ embed: { description: "It is " + p + "% false!", color: "RED" } }] })
    },
};