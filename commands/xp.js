const { MessageFlags } = require("discord.js");
const pool = require("../database");

module.exports = async function xp(command) {
  const userID = command.member.id;
  const user = await pool.query(
    `SELECT * FROM users WHERE userid = '${userID}'`
  );

  let xp = 0;
  if (user.rows.length > 0) {
    xp = user.rows[0].xp;
  }

  command.reply({ content: `You have **${xp}** points on this server`, flags: MessageFlags.Ephemeral });
};
