const { MessageFlags } = require("discord.js");
const pool = require("../database");

module.exports = async function removeRole(command) {
  let roledata = command.options.get("role");
  const role = command.member.guild.roles.cache.get(roledata.value);
  if (role) {
    await pool.query(
      `DELETE FROM roles WHERE roleid = ${role.id} AND guild = ${role.guild.id}`
    );
    command.reply({ content: `The role <@&${role.id}> has been removed from XP rewards`, flags: MessageFlags.Ephemeral });

  } else {
    command.reply({
      content: `The role ID doesn't exists on this server`,
      flags: MessageFlags.Ephemeral,
    });
  }
};
