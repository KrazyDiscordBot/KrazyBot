let guildMember = {
    userID: "",
    guildID: "",
    Ban: false,
    Ban: false,
    XP: 0,
    level: 0,
    lastXP: 0,
    afk: {
        afk: false,
        from: 0,
        reply: "AFK for No reason",
        mentions:0,
    },
    warn: [
        {
            mod: 0,
            user: 0,
            on: Date.now(),
            reason: "No reason was specified",
        }
    ],
    autoMod: {
        caps: {
            count: 1
        },
        links: {
            count: 1,
        },
        images: {
            count: 1,
        },
        emojis: {
            count: 1,
        },
        abuse: {
            count: 1,
        },
        spam: {
            count: 3,
        },
        dublicate: {
            count: 3,
        },
        strikes: 0,
        messages: [
            {
                at: 0,
                content: ""
            }
        ],
    },
    logs: {
        startToday: Date.now(),
        startWeek: Date.now(),
        startMonth: Date.now(),
        messageToday: 0,
        messageWeek: 0,
        messageMonth: 0,
        messageTotal: 0,
    }
};

module.exports = guildMember;