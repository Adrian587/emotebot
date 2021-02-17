module.exports = {
    name: 'p',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('pong');
    }
}