const Discord = require("discord.js");
const fs = require('fs')
const { linkDetector, capsPercantage, takeAction, getMuteRole, numberToPunishment, uptimer } = require("./index");

/**
 * An Extended version of Discord Client for automatically handling custom events
 */
class KrazyBot extends Discord.Client {
    /**
     * The option for your discord client
     * @param {Discord.ClientOptions} options 
     */
    constructor(options, returnn = false) {
        if (options === true) { returnn = true; options = { intents: new Discord.Intents() } };
        super(options);

        if (returnn) return;

        this.owners = process.env.OWNER.split(",");
        this.team = ["441943765855240192"]
        this.linkFinder = linkDetector;
        this.capsPercentage = capsPercantage;
        this.takeAction = takeAction;
        this.getMuteRole = getMuteRole;
        this.numberToPunishment = numberToPunishment;
        this.getPower = require("./methods/getPower");
        this.channelStats = require("./methods/statsChannel");
        this.roleStats = require("./methods/statsRole");
        this.userUser = require("./methods/statsUser");
        this.pagination = require('./page');
        this.getPower = require('./getPower');
        this.getMutedRole = require('./getMutedRole');
        this.isOwner = (id) => this.owners.includes(id);

        this.on("ready", () => require("../events/ready")(this));
        this.on("messageCreate", (message) => require("../events/message")(this, message));
        this.on("messageReactionRemove", (reaction, user) => require("../events/features/roleremove")(reaction, user));
        this.on("messageReactionAdd", (reaction, user) => {
            require("../events/features/rolegive")(reaction, user);
            require("../events/features/ticketcreate")(reaction, user);
        });
        
        fs.readdirSync("./events/logging").forEach((f) => {
            this.on(f.substring(0, f.length - 3), (a, b, c, d) => require(`../events/logging/${f}`)(a, b, c, d));
        });

        this.login(process.env.BETA_TOKEN)
        uptimer();
    }
};

module.exports = KrazyBot;
