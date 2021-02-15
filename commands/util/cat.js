const fetch = require('node-fetch');

module.exports = {
    name: 'cat',
    description: "this is a api test command!",
    async execute(message, args) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        message.channel.send(file);
    }
}