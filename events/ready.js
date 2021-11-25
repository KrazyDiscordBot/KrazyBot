/**
 * Ready event handling
 * @param {*} bot The client object
 */
module.exports = async (bot) => {

    function randomStatus() {
        let status = [
            "Haha i am not a bot, its you",
            "Any status ideas ? ............ SO WHAT ?",
            "Prefix - k! or mention me for my prefix",
        ];

        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {
            type: "WATCHING"
        });
    }

    setInterval(randomStatus, 18000);

    console.log(`Hi, ${bot.user.username} is now online!`);
};