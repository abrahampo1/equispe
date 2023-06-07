import { REST, Routes } from "discord.js";
import {config} from "dotenv";
config();

const commands = [
  {
    name: "xp",
    description: "Shows your amount of XP on this server!",
  },
  {
    name: "setrole",
    description: "Set custom roles with level XP!",
    default_member_permissions: "8",
    options: [
      {
        name: "role",
        description: "Select the role to add",
        type: 8,
        required: true,
      },
      {
        name: "xp",
        description: "The amount of XP needed to set the role",
        type: 4,
        required: true,
      },
    ],
  },
  {
    name: "removerole",
    description: "Remove custom roles!",
    default_member_permissions: "8",
    options: [
      {
        name: "role",
        description: "Select the role to remove",
        type: 3,
        autocomplete: true,
        required: true,
      },
    ],
  },
];

if(!process.env.TOKEN){
  console.log("You must set a token on the .env file to bring this bot to live");
}

const rest = new REST({ version: "10" }).setToken(
  process.env.TOKEN
);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
