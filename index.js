// ====================== INPORTING TOKEN =======================
require('dotenv').config()
// ====================== START BOT CODE ========================
const Discord = require('discord.js')
const { prefix } = require('./config.json')
const fs = require("fs")
// ======================== INTENTS ==========================
const { Intents } = Discord;
const intents = new Intents();
for (const intent of Object.keys (Intents.FLAGS)){
    if(!intent.includes("GUILD")) continue;
    intents.add(intent);
}
// ====================== CLIENT STUFF ========================
const client = new Discord.Client({
    intents: intents
});
// ====================== FS AND COMMAND HANDLER ======================
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
// ====================== LISTENING TO CONSOLE ========================
client.on('ready', () => {
    console.log(`${client.user.tag} is Online!`)
    // ===== BOT PRESENCE =====
    client.user.setPresence({
        activity: {
            name: "MESSAGE HERE",  // ===== THE MESSAGE SHOWING IN THE PRESENCE =======
            type: "LISTENING", // ==== PLAYING, WATCHING, LISTENING, STREAMING ====== 
        }
    })
})
// ====================== LISTENING TO MESSAGES ========================
client.on('message', async (message) => {

    // Returning Message , If it is from guild or Bot or Webhook
    if (message.author.bot || !message.guild || message.webhookID) return
    // Returning Message , IF it does not start from Prefix
    if (!message.content.startsWith(prefix)) return
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    
    if(command === "ping"){ 
        client.commands.get("ping").execute(client, message, args)
    }
    /* 
    To continue Commands u need to Add else if (command === "command_name"){
        client.commands.get("command_name").execute(client, message, args)
    }
    And create a File in Commands folder with that Name
    Example File is there in Commands Folder
    */
});
// ====================== BOT LOGINING ========================
client.login(process.env.TOKEN).catch((err) => {
    console.log("TOKEN Invaild / TOKEN NOT GIVEN ")
})