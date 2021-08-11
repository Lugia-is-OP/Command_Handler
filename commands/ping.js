const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute( client, message, args){
        message.channel.send("Caculating Ping....").then(m =>{
            const pingEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🏓Bot Latency is ${m.createdTimestamp - message.createdTimestamp}ms \n\n 🏓API Latency is ${Math.round(client.ws.ping)}ms`);
            
            message.channel.send({ embeds: [pingEmbed]})
            m.delete()
        })
        
    },
}