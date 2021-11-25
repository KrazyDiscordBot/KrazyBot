module.exports = {
    name: "choose",
    category: "fun",
    description: "choose something",
    args: "<Choice one> | < Choice 2 > | [choice X]",
    timeout: 5000,
    allow: "all",
    perms: "\`Embed links\`",
    reply: "Hey You can choose random things once in **1** seconds, Right now you have to wait for **leftt**",
    note: "No special perms are required by user\n`hello hi me` = 3 thing and `hihello` = 1",
    run: async (bot, message, args) => {
        //code
        let choices = args;
        message.reply("I choose : `" + choices[Math.floor(Math.random() * choices.length)]+ "`")
    }
}