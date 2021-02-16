const twitchScraper = require("../../scraper/ttv-scraper");

module.exports = {
    name: 'p',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('https://static-cdn.jtvnw.net/emoticons/v1/25/1.0');
        console.log(twitchScraper.getTwitchEmotes());
    }
}