const { MessageFlags } = require("discord.js");
const pool = require("../database");


module.exports = function setRole(command) {
  const role = command.options.getRole('role');
  const xp = command.options.get('xp');


  if (role) {
    pool.query(`INSERT INTO public.roles(
        roleid, xp, guild)
        VALUES (${role.id}, ${xp.value}, ${role.guild.id}) ON CONFLICT (roleid) DO UPDATE SET xp=${xp.value};`);
    command.reply({ content: `The amount of XP needed for <@&${role.id}> has been set to **${xp.value}**`, flags: MessageFlags.Ephemeral });
  }else{
    command.reply({ content: `The Role ID doesn't exists on this server`, flags: MessageFlags.Ephemeral });

  }

};
