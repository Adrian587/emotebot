const config = require('../../config.json');
const twitchScraper = require("../../scraper/ttv-scraper");

module.exports = {
    name: 't',
    description: "this is a emote search command!",
    async execute(message, args) {
        for(let i = 0; i < args.length; i++) {
            let imgResponse = await twitchScraper.findEmote(args[i]);
            if(imgResponse === config.NO_EMOTE_FOUND) {
                imgResponse = `There is no emote with name ${args[i]}.`;
            }
            message.channel.send(imgResponse);
        }
    }
}