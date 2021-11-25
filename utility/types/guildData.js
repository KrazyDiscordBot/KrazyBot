const guildData = {
    id: "",
    ban: {
        all: false,
        sug: false,
        comp: false,
    },
    banTill: {
        all: "0",
        sug: "0",
        comp: "0",
    },
    logChannels: {
        modlog: "0",
        generallog: "0",
        botlog: "0",
        ticketlog: "0",
        automodlog: "0",
    },
    autoMod: {
        strike: {
            kick: 8,
            ban: 15,
        },
        caps: {
            enabled: false,
            punishment: [0],
            time: "300000",
            count: 70
        },
        links: {
            enabled: false,
            punishment: [0],
            time: "300000",
            count: 1
        },
        images: {
            enabled: false,
            punishment: [0],
            time: "300000",
            count: 1
        },
        emojis: {
            enabled: false,
            punishment: [0],
            count: 1,
            time: "300000"
        },
        spam: {
            enabled: false,
            punishment: [0],
            time: "300000",
            allowed: 5,
            inTime: 5,
        },
        dublicate: {
            enabled: false,
            punishment: [0],
            count: 3,
            time: "300000"
        },
        newBan: {
            newBan: false,
            age: "2600000000"
        },
        immJoin: {
            immJoin: false,
            quantity: "10",
            last: "5000",
        },
        ignoreRole: [],
        ignoreChannel: [],
    },
    welcomeConfig: {
        background_image: "#000000",
        l1c: "#ffffff",
        l2c: "ffffff",
        uc: "ffffff",
        l1: "Welcome to the {server}",
        l2: "Now we are a family of {members}",
        show_image: false,
        show_message: false,
        channel: "0",
        embed: false,
        embed_image: "0",
        embed_color: "RANDOM",
        DM: false,
        DM_image: false,
        welcomeBots: false,
        DM_Message: "Hello {mention}, welcome to the {server}",
        human: [],
        bot: [],
        delay: "0",
        joinName:"",
        message:"",
    },
    leaveConfig: {
        background_image: "#000000",
        message:"",
        l1c: "ffffff",
        l2c: "ffffff",
        uc: "ffffff",
        l1: "{user} left the server",
        l2: "Now we are a family of {members}",
        show_image: false,
        show_message: false,
        channel: "0",
        embed: false,
        embed_image: "0",
        embed_color: "RANDOM",
    },
    levelConfig: {
        XPSystem: false,
        LevelUpMessage: "Congrats {mention}, you reached {level} level",
        LevelUpChannel: "0",
        ignoreChannel: [],
        ignoreUser: [],
        formula: "5 * (lvl^2) + lvl*50 +100",
        wait: "60000",
        rate: 1,
        role: [],
        roleAt: [],
        coin: [],
        coinAt: [],
    },
    basicConfig: {
        prefix: "k!",
        protected: [],
        admins: [],
        mods: [],
        owners: [],
        default: [],
        lockIgnore: [],
        disabledCommand: [],
        disabledChannel: [],
        disabledUser: [],
        disabledRole: [],
        disableUserCommand: [
            {
                user: "",
                commands: [],
            }
        ],
        disableRoleCommand: [
            {
                role: "",
                commands: [],
            }
        ],
        disableChannelCommand: [
            {
                channel: "",
                commands: [],
            }
        ],
        breakChannel: [],
        breakUser: [],
        break: false,
        donate: "",
        premium: {
            premium: false,
            till: "0"
        },
    },
    linkConfig: {
        reply: false,
        mod: false,
        ignore: [],
    },
    countConfig: {
        channel: "",
        by: "",
        at: "",
        pin: [],
        role: [],
        roleat: [],
    },
    statsConfig: {
        member: {
            channel: "0",
        },
        bot: {
            channel: "0",
        },
        human: {
            channel: "0",
        },
        channel: {
            channel: "0",
        },
        role: {
            channel: "0",
        },
    },
    autoRole: {
        voiceRole: [
            {
                role: "0",
                channel: "0",
            }
        ],
        selfRole: [
            {
                name: "0",
                role: "0",
                reply: "0",
                channel: "0",
            }
        ],
        reactionRole: [
            {
                name: "0",
                message: "0", // Message id to work on
                max: 0,
                say: "0",
                required: [],
                ignore: [],
                roles: [{
                    role: "0",
                    emoji: "0",
                    reply: "0",
                }]
            }
        ],
    },
    complain: {
        at: "0",
        list: [
            {
                id: "0",
                userID: "0",
                complain: "0",
            }
        ],
        ignore: [],
    },
    suggestion: {
        at: "0",
        list: [
            {
                id: "0",
                userID: "0",
                complain: "0",
            }
        ],
        ignore: [],
    },
    autoChannel: [{
        id: "0",
        name: "{username}",
        channels: [],
    }],
    autoMessage: {
        tabbo: [""],
        trigger: [{
            trigger: "0",
            response: "0",
            embed: false,
            include: true,
            case: false
        }]
    },
    ticket: {
        panel: [{
            name: "",
            emoji: "",
            msg: "",
            chname: "",
            open: "",
            close: "",
            main: "",
            limit: 1,
            channels: [
                { user: "", id: "" }
            ],
            mod: [],
            ignored: [],
            categoryOpen: "",
            categoryClose: "",
        }]
    }
}

module.exports = guildData;