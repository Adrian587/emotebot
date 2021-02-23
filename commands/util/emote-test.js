const config = require('../../config.json');
const betterTwitchScraper = require("../../scraper/bttv-scraper");
const twitchScraper = require("../../scraper/ttv-scraper");
const axios = require('axios');


module.exports = {
    name: 'g',
    description: "this is a emote search command!",
    async execute(message, args) {
        for (let i = 0; i < args.length; i++) {
            let imageURL = betterTwitchScraper.findBetterTwitchEmote(args[i]);
            if(imageURL === config.NO_EMOTE_FOUND) {
                imageURL = await twitchScraper.findEmote(args[i]);
                if(imageURL === config.NO_EMOTE_FOUND) {
                     message.channel.send(`${message.author.username}, there is no emote with name ${args[i]}.`);
                } else {
                    message.channel.send(message.author.username + ':');
                    message.channel.send(imageURL); 
                }
            } else {
                const response = await axios.get(imageURL,  { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data, "utf-8");
                message.channel.send(message.author.username + ':', {files: [imageURL]});             }
        }
    }
}