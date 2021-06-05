const axios = require('axios');
const fs = require('fs');

const config = require('../config.json');
const betterEmotes = require('../bttvemotes.json');

const offsetLimit = 10000;
let emotes = [];

const fsPromises = fs.promises;
class betterTwitchScraper {
	async getBetterTwitchEmotes() {
		for (let offset = 0; offset <= offsetLimit; offset += 50) {
			const response = await axios.get(`https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=50`);
			const currentEmotes = response.data.map((emoteData) => ({
				emoteName: emoteData.emote.code,
				emoteID: emoteData.emote.id,
			}));
			emotes = emotes.concat(currentEmotes);
		}

		try {
			await fsPromises.writeFile(config.BTTV_EMOTES_PATH, JSON.stringify(emotes, null, 2));
		}
		catch (err) {
			console.log(err);
		}
		// return emotes;
	}

	findBetterTwitchEmote(emote) {
		for (let i = 0; i < betterEmotes.length; i++) {
			if (betterEmotes[i]['emoteName'].toLowerCase() === emote.toLowerCase()) {
				const imageID = (betterEmotes[i]['emoteID']);
				return `https://cdn.betterttv.net/emote/${imageID}/1x.gif`;
			}
		}
		return config.NO_EMOTE_FOUND;

	}

    findBetterTwitchEmoteBig(emote) {
		for (let i = 0; i < betterEmotes.length; i++) {
			if (betterEmotes[i]['emoteName'].toLowerCase() === emote.toLowerCase()) {
				const imageID = (betterEmotes[i]['emoteID']);
				return `https://cdn.betterttv.net/emote/${imageID}/3x.gif`;
			}
		}
		return config.NO_EMOTE_FOUND;

	}
}

module.exports = new betterTwitchScraper();