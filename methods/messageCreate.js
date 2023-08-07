const cooldown = 5;
const pool = require("../database");

async function messageCreate(message) {
  if (message.author.bot) {
    return;
  }

  const guild = message.guildId;
  const author = message.author.id;
  const time = message.createdTimestamp;
  const xp = Math.min(message.content.length, 30);
  let total_xp = 0;
  let id = "nextval('users_id_seq'::regclass)";
  const data = await pool.query(
    `SELECT * FROM public.users WHERE userid = '${author}' and guild = ${guild}`
  );
  if (data.rows.length == 0) {
    total_xp = xp;
  } else {
    id = data.rows[0].id;
    total_xp = parseInt(xp) + parseInt(data.rows[0].xp);
    if (Date.now() - cooldown * 1000 < parseInt(data.rows[0].last_message)) {
      return;
    }
  }

  pool.query(
    `INSERT INTO public.users (id, userid, xp, last_message, guild) VALUES(${id}, '${author}', ${total_xp}, ${time}, ${guild}) ON CONFLICT (id) DO UPDATE SET xp=${total_xp}, last_message=${time}`
  );

  const rol_query = await pool.query(
    `SELECT * FROM roles WHERE xp <= ${total_xp} and guild = ${guild} ORDER BY xp DESC`
  );

  if (rol_query.rows.length == 0) {
    return;
  }

  rol_query.rows.map((rol) => {
    if (!message.member.roles.cache.has(rol.roleid)) {
      message.member.roles.add(rol.roleid);
    }
  });
}

module.exports = messageCreate;
