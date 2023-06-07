const { MessageFlags } = require("discord.js");
const setRole = require("./commands/setRole");
const xp = require("./commands/xp");
const removeRole = require("./methods/removeRole");
const removeRoleCommand = require("./commands/removeRole");

function handleCommand(command) {
  if (command.isAutocomplete()) {
    switch (command.commandName) {
      case "removerole":
        removeRole(command);
        break;
      default:
        break;
    }
    return;
  }

  switch (command.commandName) {
    case "setrole":
      setRole(command);
      break;
    case "removerole":
      removeRoleCommand(command);
      break;
    case "xp":
      xp(command);
      break;
    default:
      command.reply({ content: "Pong!", flags: MessageFlags.Ephemeral });
      break;
  }
}

module.exports = handleCommand;
