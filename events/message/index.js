const { Client } = require("../../utility");
const { serverModel, serverUserModel } = require("../../models");

const testClient = new Client(true);

/**
 * Ready event handling
 * @param {testClient} bot The client object
 */
module.exports = async (bot, message) => {
    if (!message.guild) return;

    const serverDB = await serverModel.findOne({ id: message.guild?.id }) || await serverModel.create({ id: message.guild.id }), serverUserDB = await serverUserModel.findOne({ userID: message.author.id, guildID: message.guildID });

    require("./afk")(bot, message, serverDB, serverUserDB);
    require("./xp")(bot, message, serverDB, serverUserDB);
    require("./anti")(bot, message, serverDB, serverUserDB);
    require("./autoresponse")(bot, message, serverDB);
    require("./count")(bot, message, serverDB);
    require("./messagecounter")(bot, message, serverUserDB);
    require("./selfrole")(bot, message, serverDB);
    require("./taboo")(bot, message, serverDB);
}