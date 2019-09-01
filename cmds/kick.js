const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");

module.exports.run = async(client,message,args) => {
    try{
        function send (msg){
            message.channel.send(msg)
        }

    if(!message.member.hasPermissions("KICK_MEMBERS")) return message.channel.send("У вас нет прав!");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); 

    if(!args[0]) return send("Вы не указали пользователя");
    if(!rUser) return send("Пользователь не найден")

    let embed = new Discord.RichEmbed()
    .setDescription("**Кик пользователя**")
    .addField("Администратор",message.author.username)
    .addField("Кикнул",`${rUser.user.username}`)
    .setColor("RED");

    message.guild.member(rUser).kick("Кик");
    message.channel.send(embed);
}catch(err){
    if(err.name === "ReferenceError")
    console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
}

};

module.exports.help = {
    name: "kick"
}