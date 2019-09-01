const Discord = module.require("discord.js");
const _clan = require("../clan.json");


module.exports.run = async (client,message,args) => {

let a = message.author.id;
let clcrEb = new Discord.RichEmbed()
.setAuthor(`Информация о клане | ${_clan[a].clan}`)
.addField("Лидер")
.addField("Урровень")
.addField("Роли")






}
module.exports.help = {
    name: "clancreate"
};