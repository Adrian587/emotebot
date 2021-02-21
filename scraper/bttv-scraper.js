const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const config = require('../config.json');
const { getSiteHtml } = require('../scraper/scraper');
const emote = require('../commands/util/twitch-global');
// const betterEmotes = require('../bttvemotes.json');
const { url } = require('inspector');
const index = require('../index');

const offsetLimit = 2000;
let emotes = [];

const fsPromises = fs.promises;
class betterTwitchScraper {
    async getBetterTwitchEmotes() {
        for (let offset = 0; offset <= offsetLimit; offset += 50) {
            let response = await axios.get(`https://api.betterttv.net/3/emotes/shared/top?offset=${offset}&limit=50`)
            let currentEmotes = response.data.map((emoteData) => ({
                emoteName: emoteData.emote.code,
                emoteID: emoteData.emote.id
            }));
            emotes = emotes.concat(currentEmotes);
        }

        // try {
        //     await fsPromises.writeFile(config.BTTV_EMOTES_PATH, JSON.stringify(emotes, null, 2),);
        // }
        // catch (err) {
        //     console.log(err);
        // }
        return emotes;
    }

    findBetterTwitchEmote(emote, emotes) {
        for(let i = 0; i < emotes.length; i++) {
            if(emotes[i]['emoteName'].toLowerCase() === emote.toLowerCase()) {
                let imageID = (emotes[i]['emoteID']);
                return `https://cdn.betterttv.net/emote/${imageID}/1x.gif`;
            }
        }
        return config.NO_EMOTE_FOUND;

    }
}

module.exports = new betterTwitchScraper();