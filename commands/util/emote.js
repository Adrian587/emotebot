const config = require('../../config.json');
const betterTwitchScraper = require("../../scraper/bttv-scraper");
const twitchScraper = require("../../scraper/ttv-scraper");

module.exports = {
    name: 'e',
    description: "this is a emote search command!",
    async execute(message, args) {
        let BTTV_EMOTES = await betterTwitchScraper.getBetterTwitchEmotes();
        for (let i = 0; i < args.length; i++) {
            let imageURL = betterTwitchScraper.findBetterTwitchEmote(args[i], BTTV_EMOTES);
            if(imageURL === config.NO_EMOTE_FOUND) {
                imageURL = await twitchScraper.findEmote(args[i]);
                if(imageURL === config.NO_EMOTE_FOUND) {
                     message.channel.send(`There is no emote with name ${args[i]}.`);
                } else {
                    message.channel.send(imageURL);
                }
            } else {
            message.channel.send(imageURL); 
            }
        }
    }
}