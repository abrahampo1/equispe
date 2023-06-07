const pool = require("../database");

module.exports = async function removeRole(command) {
  const role = command.options.get("role");
  const roles = await pool.query("SELECT roleid FROM roles");

  let response = []

  let search = roles.rows.filter(i => command.member.guild.roles.cache.get(i.roleid).name.includes(role.value.toLowerCase()))

  search.map((rol)=>{
    response.push({
        name: command.member.guild.roles.cache.get(rol.roleid).name,
        value: rol.roleid,
    })
  })

  command.respond(response);

};
