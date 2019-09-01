const Discord = module.require("discord.js");
const fs = require("fs");
const desc = require("../desc.json");
const prof = require("../profile.json");
const clan = require("../clan.json");
const moment = require('moment');


module.exports.run = async (client,message,args) => {
  let user = message.mentions.users.first() || message.author;

  let _curlvl = prof[user.id].lvl;
  let nxtLvl = prof[user.id].lvl * 300;
let _xp = prof[user.id].xp;

let _clan = prof[user.id].clan

let f = prof[user.id].f;
let ad = prof[user.id].a;
let d = prof[user.id].d;



    let _coins = prof[user.id].coins;
    let _msg = prof[user.id].desc;
    let embed = new Discord.RichEmbed()
    .setTitle(`Информация о человеке | ${user.username}`)
    .setDescription("*" + _msg + "*")
    .addField("Уровень", `${_curlvl} уровень.\n${_xp}/${nxtLvl}xp`, true)
    .addField("Коинов",`${_coins} <a:CoinI:602532590049689608>`, true)
    .setColor('#10c7e2')
    .addField("На сервере",`${moment(message.member.joinedAt).format('DD')} дней`, true)
    .addField("Клан", "**" + `${_clan}` + "**", true)
    .addField("Возлюбленная", "**" + "Отсутствует" + "**", true)
    .addField("Играет", `**${user.presence.game ? user.presence.game.name : '--'}**`)
    .addField("Достижения", `${f} - Аристократ\n${ad} - Король ивентов\n${d} - Сердцеед`, true)
    .addField("Роли: ", message.member.roles.map(role => role.toString()).join("\n"), true)
    .setThumbnail(user.avatarURL);
    

    message.channel.send(embed);

    //{moment(user.joinedAt).format('DD.MM.YYYY')}
};
module.exports.help = {
    name: "profile"
};
