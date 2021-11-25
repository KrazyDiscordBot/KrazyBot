const { Schema, model, SchemaTypes } = require('mongoose');

const guildDataSchema = new Schema({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    ban: {
        all: { type: SchemaTypes.Boolean, default: false },
        sug: { type: SchemaTypes.Boolean, default: false },
        comp: { type: SchemaTypes.Boolean, default: false },
    },
    banTill: {
        all: { type: SchemaTypes.String, default: "0" },
        sug: { type: SchemaTypes.String, default: "0" },
        comp: { type: SchemaTypes.String, default: "0" },
    },
    logChannels: {
        modlog: { type: SchemaTypes.String, default: "0" },
        generallog: { type: SchemaTypes.String, default: "0" },
        botlog: { type: SchemaTypes.String, default: "0" },
        ticketlog: { type: SchemaTypes.String, default: "0" },
        automodlog: { type: SchemaTypes.String, default: "0" },
    },
    autoMod: {
        strike: {
            kick: { type: SchemaTypes.Number, default: 8 },
            ban: { type: SchemaTypes.Number, default: 15 },
        },
        caps: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            time: { type: SchemaTypes.String, default: "300000" },
            count: { type: SchemaTypes.Number, default: 70 }
        },
        links: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            count: { type: SchemaTypes.Number, default: 1 },
            time: { type: SchemaTypes.String, default: "300000" }
        },
        images: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            count: { type: SchemaTypes.Number, default: 1 },
            time: { type: SchemaTypes.String, default: "300000" }
        },
        emojis: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            count: { type: SchemaTypes.Number, default: 1 },
            time: { type: SchemaTypes.String, default: "300000" }
        },
        spam: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            count: { type: SchemaTypes.Number, default: 3 },
            time: { type: SchemaTypes.String, default: "300000" },
            allowed: { type: SchemaTypes.Number, default: 5 },
            inTime: { type: SchemaTypes.Number, default: 5 },
        },
        dublicate: {
            enabled: { type: SchemaTypes.Boolean, default: false },
            punishment: { type: SchemaTypes.Array, default: [0] },
            count: { type: SchemaTypes.Number, default: 3 },
            time: { type: SchemaTypes.String, default: "300000" }
        },
        newBan: {
            newBan: { type: SchemaTypes.Boolean, default: false },
            age: { type: SchemaTypes.String, default: "2600000000" }
        },
        immJoin: {
            immJoin: { type: SchemaTypes.Boolean, default: false },
            quantity: { type: SchemaTypes.String, default: "10" },
            last: { type: SchemaTypes.String, default: "5000" },
        },
        ignoreRole: { type: SchemaTypes.Array, default: [] },
        ignoreChannel: { type: SchemaTypes.Array, default: [] },
    },
    welcomeConfig: {
        background_image: { type: SchemaTypes.String, default: "#000000" },
        l1c: { type: SchemaTypes.String, default: "#ffffff" },
        l2c: { type: SchemaTypes.String, default: "#ffffff" },
        uc: { type: SchemaTypes.String, default: "#ffffff" },
        l1: { type: SchemaTypes.String, default: "Welcome to the {server}" },
        l2: { type: SchemaTypes.String, default: "Now we are a family of {members}" },
        show_image: { type: SchemaTypes.Boolean, default: false },
        show_message: { type: SchemaTypes.Boolean, default: false },
        channel: { type: SchemaTypes.String, default: "0" },
        embed: { type: SchemaTypes.Boolean, default: false },
        embed_image: { type: SchemaTypes.String, default: "0" },
        embed_color: { type: SchemaTypes.String, default: "RANDOM" },
        DM: { type: SchemaTypes.Boolean, default: false },
        DM_image: { type: SchemaTypes.Boolean, default: false },
        DM_Message: { type: SchemaTypes.String, default: "Hello {mention}, welcome to the {server}" },
        message: { type: SchemaTypes.String, default: "Hello {mention}, welcome to the {server}\nNow we are a family of {members} members" },
        human: [{ type: SchemaTypes.String, default: [] }],
        bot: [{ type: SchemaTypes.String, default: [] }],
        delay: { type: SchemaTypes.String, default: "0" },
        joinName: { type: SchemaTypes.String, default: "" },
        welcomeBots: { type: SchemaTypes.Boolean, default: false },
    },
    leaveConfig: {
        background_image: { type: SchemaTypes.String, default: "#000000" },
        l1c: { type: SchemaTypes.String, default: "#ffffff" },
        l2c: { type: SchemaTypes.String, default: "#ffffff" },
        uc: { type: SchemaTypes.String, default: "#ffffff" },
        l1: { type: SchemaTypes.String, default: "{user} left the server" },
        l2: { type: SchemaTypes.String, default: "Now we are a family of {members}" },
        show_image: { type: SchemaTypes.Boolean, default: false },
        show_message: { type: SchemaTypes.Boolean, default: false },
        channel: { type: SchemaTypes.String, default: "0" },
        embed: { type: SchemaTypes.Boolean, default: false },
        embed_image: { type: SchemaTypes.String, default: "0" },
        embed_color: { type: SchemaTypes.String, default: "RANDOM" },
        message: { type: SchemaTypes.String, default: "{user} left the server\nNow we are a family of {members} members" },
    },
    levelConfig: {
        XPSystem: { type: SchemaTypes.Boolean, default: false },
        LevelUpMessage: { type: SchemaTypes.String, default: "Congrats {mention}, you reached {level} level" },
        LevelUpChannel: { type: SchemaTypes.String, default: "0" },
        ignoreChannel: [{ type: SchemaTypes.String, default: [] }],
        ignoreUser: [{ type: SchemaTypes.String, default: [] }],
        formula: { type: SchemaTypes.String, default: "5 * (lvl^2) + lvl*50 +100" },
        wait: { type: SchemaTypes.String, default: "60000" },
        rate: { type: SchemaTypes.Number, default: 1 },
        role: [{ type: SchemaTypes.String, default: [] }],
        roleAt: [{ type: SchemaTypes.String, default: [] }],
        coin: [{ type: SchemaTypes.String, default: [] }],
        coinAt: [{ type: SchemaTypes.String, default: [] }],
    },
    basicConfig: {
        prefix: { type: SchemaTypes.String, default: "k!" },
        protected: [{ type: SchemaTypes.String, default: [] }],
        admins: [{ type: SchemaTypes.String, default: [] }],
        mods: [{ type: SchemaTypes.String, default: [] }],
        owners: [{ type: SchemaTypes.String, default: [] }],
        default: [{ type: SchemaTypes.String, default: [] }],
        lockIgnore: [{ type: SchemaTypes.String, default: [] }],
        disabledCommand: [{ type: SchemaTypes.String, default: [] }],
        disabledChannel: [{ type: SchemaTypes.String, default: [] }],
        disabledUser: [{ type: SchemaTypes.String, default: [] }],
        disabledRole: [{ type: SchemaTypes.String, default: [] }],
        disableUserCommand: [
            {
                user: { type: SchemaTypes.String, default: "" },
                commands: [{ type: SchemaTypes.String, default: [] }],
            }
        ],
        disableRoleCommand: [
            {
                role: { type: SchemaTypes.String, default: "" },
                commands: [{ type: SchemaTypes.String, default: [] }],
            }
        ],
        disableChannelCommand: [
            {
                channel: { type: SchemaTypes.String, default: "" },
                commands: [{ type: SchemaTypes.String, default: [] }],
            }
        ],
        breakChannel: [{ type: SchemaTypes.String, default: [] }],
        breakUser: [{ type: SchemaTypes.String, default: [] }],
        break: { type: SchemaTypes.Boolean, default: false },
        donate: { type: SchemaTypes.String, default: "" },
        premium: {
            premium: { type: SchemaTypes.Boolean, default: false },
            till: { type: SchemaTypes.String, default: "0" }
        },
    },
    linkConfig: {
        reply: { type: SchemaTypes.Boolean, default: false },
        mod: { type: SchemaTypes.Boolean, default: false },
        ignore: [{ type: SchemaTypes.String, default: [] }],
    },
    countConfig: {
        channel: { type: SchemaTypes.String, default: "" },
        by: { type: SchemaTypes.String, default: "" },
        at: { type: SchemaTypes.String, default: "" },
        pin: [{ type: SchemaTypes.String, default: [] }],
        role: [{ type: SchemaTypes.String, default: [] }],
        roleat: [{ type: SchemaTypes.String, default: [] }],
    },
    statsConfig: {
        member: { type: SchemaTypes.String, default: "0" },
        bot: { type: SchemaTypes.String, default: "0" },
        human: { type: SchemaTypes.String, default: "0" },
        channel: { type: SchemaTypes.String, default: "0" },
        role: { type: SchemaTypes.String, default: "0" },
        category: { type: SchemaTypes.String, default: "0" },
    },
    autoRole: {
        voiceRole: [
            {
                role: { type: SchemaTypes.String, default: "0" },
                channel: { type: SchemaTypes.String, default: "0" },
            }
        ],
        selfRole: [
            {
                name: { type: SchemaTypes.String, default: "0" },
                role: { type: SchemaTypes.String, default: "0" },
                reply: { type: SchemaTypes.String, default: "0" },
                channel: { type: SchemaTypes.String, default: "0" },
            }
        ],
        reactionRole: [
            {
                name: { type: SchemaTypes.String, default: "0" },
                message: { type: SchemaTypes.String, default: "0" }, // Message id to work on
                max: { type: SchemaTypes.Number, default: 0 },
                say: { type: SchemaTypes.String, default: "0" },
                required: [{ type: SchemaTypes.String, default: [] }],
                ignore: [{ type: SchemaTypes.String, default: [] }],
                roles: [{
                    role: { type: SchemaTypes.String, default: "0" },
                    emoji: { type: SchemaTypes.String, default: "0" },
                    reply: { type: SchemaTypes.String, default: "0" },
                }]
            }
        ],
    },
    complain: {
        at: { type: SchemaTypes.String, default: "0" },
        list: [
            {
                id: { type: SchemaTypes.String, default: "0" },
                userID: { type: SchemaTypes.String, default: "0" },
                complain: { type: SchemaTypes.String, default: "0" },
            }
        ],
        ignore: [{ type: SchemaTypes.String, default: [] }],
    },
    suggestion: {
        at: { type: SchemaTypes.String, default: "0" },
        list: [
            {
                id: { type: SchemaTypes.String, default: "0" },
                userID: { type: SchemaTypes.String, default: "0" },
                complain: { type: SchemaTypes.String, default: "0" },
            }
        ],
        ignore: [{ type: SchemaTypes.String, default: [] }],
    },
    autoChannel: [{
        id: { type: SchemaTypes.String, default: "0" },
        name: { type: SchemaTypes.String, default: "{username}" },
        channels: [{ type: SchemaTypes.String, default: [] }],
    }],
    autoMessage: {
        tabbo: [{ type: SchemaTypes.String, default: [] }],
        trigger: [{
            trigger: { type: SchemaTypes.String, default: "0" },
            response: { type: SchemaTypes.String, default: "0" },
            embed: { type: SchemaTypes.Boolean, default: false },
            include: { type: SchemaTypes.Boolean, default: true },
            case: { type: SchemaTypes.Boolean, default: false }
        }]
    },
    ticket: {
        panel: [{
            name: { type: SchemaTypes.String, default: "" },
            emoji: { type: SchemaTypes.String, default: "📩" },
            msg: { type: SchemaTypes.String, default: "" },
            chname: { type: SchemaTypes.String, default: "{username}" },
            open: { type: SchemaTypes.String, default: "" },
            close: { type: SchemaTypes.String, default: "" },
            main: { type: SchemaTypes.String, default: "" },
            limit: { type: SchemaTypes.Number, default: 1 },
            channels: [{
                user: { type: SchemaTypes.String, default: "" },
                id: { type: SchemaTypes.String, default: "" }
            }],
            mod: [{ type: SchemaTypes.String, default: [] }],
            ignored: [{ type: SchemaTypes.String, default: [] }],
            categoryOpen: { type: SchemaTypes.String, default: "" },
            categoryClose: { type: SchemaTypes.String, default: "" },
        }]
    },
});

module.exports = model("guildconfig_", guildDataSchema);


/*economy: {
    economy: { type: SchemaTypes.Boolean, default: false },
    wallerStart: { type: SchemaTypes.String, default: "500" },
    bankStart: { type: SchemaTypes.String, default: "1000" },
    serverBank: { type: SchemaTypes.String, default: "0" },
    bankIncrementCooldown: { type: SchemaTypes.String, default: "10000" },
    bankIncrementAmount: { type: SchemaTypes.String, default: "10-50" },
    bankIncrementMinAmount: { type: SchemaTypes.String, default: "0" },
    dailyAmount: { type: SchemaTypes.String, default: "0" },
    dailyIncrementAmount: { type: SchemaTypes.String, default: "0" },
    voteAmount: { type: SchemaTypes.String, default: "0" },
    voteIncrementAmount: { type: SchemaTypes.String, default: "0" },
    shop: [{
        name: { type: SchemaTypes.String, default: "" },
        description: { type: SchemaTypes.String, default: "" },
        small_description: { type: SchemaTypes.String, default: "" },
        function: { type: SchemaTypes.String, default: "" },
        function_con: { type: SchemaTypes.String, default: "" },
        price: { type: SchemaTypes.Number, default: 1 },
        sell: { type: SchemaTypes.Number, default: 1 },
        sellable: { type: SchemaTypes.Boolean, default: true },
        max: { type: SchemaTypes.Number, default: 1 },
        cooldown: { type: SchemaTypes.Number, default: 1 },
        quantity: { type: SchemaTypes.Number, default: 1 },
        img: { type: SchemaTypes.String, default: "" },
    }]
}*/