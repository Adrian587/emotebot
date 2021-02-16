const config = require('../../config.json');


module.exports = {
    name: 'emote',
    description: "this is a emote search command!",
    async execute(message, args) {
        
        message.channel.send('in development');
    }
}