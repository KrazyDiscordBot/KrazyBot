//export
module.exports = {
    name: "say",
    allow: "all",
    category: "fun",
    description: "say something ;)",
    options: [{
        name: "stuff",
        description: "the thing you wanan say as a bot",
        type: 3,
        required: false
    }],
    args: "<thing you wanna say as a bot>",
    timeout: 5000,
    reply: "You can say something like kool humans once in **5** seconds only , Right now you have to wait for **leftt**",
    perms: "\`Embed Links\`",
    note: "No special permissions are required by user",
    run: async (bot, message, args, touse) => {
        if (!args[0]) return message.channel.send("You have to say something");
        if (args.slice(0).join(" ").includes("@here") || args.slice(0).join(" ").includes("@everyone") && !message.member.hasPermission("MENTION_EVERYONE")) return message.reply("Hey you can't mention everyone or here");

        message.channel.createWebhook(message.author.username, { avatar: message.author.avatarURL() }).then(async hook => {
            message.delete({ timeout: 100 }).catch(() => { /* lol */ });
            await hook.send(args.join(" "));
            await hook.delete();
        }).catch(() => {
            message.channel.send(args.slice(0).join(" ") + `\n\n${message.author.usernamename}\ said this, give me Manage webhook permission to become really cool`);
        });
    }
}