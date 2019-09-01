const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");
module.exports.run = async (client,message,args) => {
    try{
      
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("У вас нет прав");
    let rUser = client.rUser;
    if(!args[0]) return client.send("Вы не указали пользователя");
    if(!rUser) return client.send("Пользователь не найден");
    if(!profile[rUser.id])return client.send("Пользователя нету в profile.json");
    if(profile[rUser.id]<=0) return client.send("У пользователя 0 предупреждений");
    profile[rUser.id].warns--;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    let embed = new Discord.RichEmbed()
    .setDescription("Предупреждение")
    .setColor('#25ca85')
    .addField("Администратор",message.author.username)
    .addField("Снял предупреждение",`${rUser.user.username}`)
    .addField("Количество предупрежденией",`${profile[rUser.id].warns}/3`);

    message.channel.send(embed);
    }catch(err){
        console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
    }

};
module.exports.help = {
    name: "unwarn"
};