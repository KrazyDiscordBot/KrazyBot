module.exports = {
    name: "advise",
    category: "fun",
    aliases: ["advice"],
    description: "get advise on something",
    args: "<thing in which u want advise>",
    timeout: 5000,
    allow: "all",
    run: async (bot, message, args) => {
        //code
        if (args.join(" ").toLowerCase().includes("suicide")) return message.reply({ embeds: [{ color: "DARK_RED", title: "DUDE NEVER THINK ABOUT DYING LIFE IS PRECIOUS" }] });

        let advise = [
            "No your PP is too small for this",
            "you should do this",
            "What is this i don't get it",
            "Are you okay with your head right now",
            "I guess you should do it",
            "Its so risky mann, please back off",
            "If its now worth it, Don't do it",
            "-_- bruh, are you stupid",
            "no that is not good. YOU BETTER DON'T",
            "baka, are you serious ?",
            "wow that is pretty cool",
            "i can't give advise for this",
            "hmm interesting, btw good question",
            "Stop it I am not your advisor",
            "I belive you should follow your heart",
            "Maybe you should follow your brain",
            "i think ask your father, kiddo",
            "You can't do this leave it",
            "nah don't you think",
            "Use `k!choose` for this",
            "I guess leave this thing",
            "damn do it right now",
            "Ummm, You should search on google for this xD",
            "i guess it will be pretty kool",
            "baka don't you think about it again",
            "Bruh! you serious ||noh!|| Your serious ||Nooh||",
            "I thinking you should ......",
            "Pay me if you want advise for this xD\n**JK**",
            "Can't you take your decesions yourself",
            "I am a bot i don't know",
            "I will advise you, if you give my developer some epic suggestions via `k!botsuggest` ",
            "Bruh! Bruh! bruh bruh bruh",
            "OMG! Stop it and get some help",
            "Kiddo go and complete your maths homeowork first"];

        message.channel.send({ embeds: [{ color: "RANDOM", title: advise[Math.floor(Math.random() * advise.length)] }] });
    }
}