const config = require('../../config.json');
const betterTwitchScraper = require("../../scraper/bttv-scraper");

module.exports = {
    name: 'b',
    description: "this is a emote search command!",
    async execute(message, args) {
        for (let i = 0; i < args.length; i++) {
            let imageURL = betterTwitchScraper.findBetterTwitchEmote(args[i]);
            message.channel.send(imageURL);
        }
    }
}