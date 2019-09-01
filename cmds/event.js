const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");

module.exports.run = async(client,message,args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У вас нет прав");
    let rUser = message.guild.member(message.mentions.users.first());
    if(!args[0]) return client.send("Вы не указали пользователя");
    if(!rUser) return client.send("Пользователь не найден");

    if(message.content.startsWith ("!!event")){
        profile[rUser.id].event++;
    }

    if(profile[rUser.id].event >= 10){
        profile[rUser.id].a = "<:yesss:611614814304731177>";
  let a_eb = new Discord.RichEmbed()
.setDescription(`${rUser} получил достижение "Король ивента".`)
.setThumbnail('https://i.ya-webdesign.com/images/cartoon-butter-png-6.png')
.setAuthor("Получено новое достижение!")
.setTimestamp()
.setColor("GREEN");
client.channels.get("604952720079716384").send(a_eb);
    }
fs.writeFile ("../profile.json", JSON.stringify(profile), err =>{
  if(err) throw err;
});
}
    module.exports.help = {
        name: "event"
    }