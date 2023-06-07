const { Client, GatewayIntentBits } = require("discord.js");
const messageCreate = require("./methods/messageCreate");
const handleCommand = require("./commandHandler");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
  ],
});
require("dotenv").config();

console.log("Starting Discord Bot...");

client.on("ready", () => {
  console.log("Discord bot ready!");
});

client.on("messageCreate", messageCreate);
client.on("interactionCreate", handleCommand);

if(!process.env.TOKEN){
  console.log("You must set a token on the .env file to bring this bot to live");
}


client.login(process.env.TOKEN);


//Created by @abrahampo1 member of Team Lypus