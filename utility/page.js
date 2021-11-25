const { ReactionCollector } = require("discord.js");

try {
	const paginationEmbed = async (msg, pages, emojiList = ['⏪', '⏩'], timeout = 120000) => {
		if (!msg || !msg.channel || !pages) return;

		let page = 0;
		const curPage = await msg.channel.send({ embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)] });

		for (const emoji of emojiList) await curPage.react(emoji);

	const reactionCollector = new ReactionCollector(msg, { filter: (r, u) => u.id === msg.author.id, time: timeout });

		reactionCollector.on('collect', (reaction,user) => {
			if(!emojiList.includes(reaction.emoji.name) || msg.author.id !== user.id)return console.log(msg.author.id !== user.id+"1"+emojiList.includes(reaction.emoji.name));

			reaction.users.remove(msg.author);

			switch (reaction.emoji.name) {
				case emojiList[0]:
					page = page > 0 ? --page : pages.length - 1;
					break;
				case emojiList[1]:
					page = page + 1 < pages.length ? ++page : 0;
					break;
				default:
					break;
			}
			curPage.edit({ embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)] });
		});
		reactionCollector.on('end', () => {
			curPage.reactions.removeAll().catch((e) => console.log("no emb found"))
		});
		return curPage;
	};
	module.exports = paginationEmbed;
} catch (e) {
	console.log(e);
}