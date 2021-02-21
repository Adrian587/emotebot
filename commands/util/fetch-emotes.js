const config = require('../../config.json');
const bttvScraper = require('../../scraper/bttv-scraper');
module.exports = {
    name: 'f',
    description: "this is a emote search command!",
    async execute(message, args) {
            bttvScraper.getBetterTwitchEmotes();
            // message.channel.send(imgResponse);
        }
    }
