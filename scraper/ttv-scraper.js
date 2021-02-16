const config = require('../../EmoteBot/config.json');

const {getSiteHtml} = require('../scraper/scraper');
const cheerio = require('cheerio');

class twitchScraper {
    async getTwitchEmotes() {
        const twitchHTML = await getSiteHtml(config['twitch-url']);
        console.log(twitchHTML);
        const $ = cheerio.load(twitchHTML);
        let emoteRows = this.findCardBody($);
        console.log(emoteRows.children.length)
        // let firstRow = emoteRows.children[0];
        // console.log(firstRow);
    }
    // should be 37 rows 

    findCardBody($) {
        return $('h3:contains("Global Emotes")').parent().parent().children()['1'];
    }
}

module.exports = new twitchScraper();