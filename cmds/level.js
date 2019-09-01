const Discord = require("discord.js");
let xp = require("../profile.json");

module.exports.run = async (client, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     lvl: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].lvl;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("GREEN")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed)

}

module.exports.help = {
  name: "lvl"
}