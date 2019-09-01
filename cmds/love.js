const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");

module.exports.run = async(client,message,args) => {
    let rUser = message.guild.member(message.mentions.users.first());
    if(!args[0]) return client.send("Вы не указали пользователя");
    if(!rUser) return client.send("Пользователь не найден");

    if(profile[rUser.id].love !== null) return
    message.channel.send("У вас уже есть возлюбленный(-ая)!");

    if(message.content.startsWith ("!!love")){
        profile[rUser.id].love = message.author.id | guild.member[message.author].setRoles(['617037274957217846']);
        profile[message.author.id].love = rUser.id | guild.member[rUser].setRoles(['617037274957217846']);


        guild.createChannel("создать приват",{type:'VOICE',
        permissionOverwrites: [{
            deny: ['ADMINISTRATOR','SPEAK'],
            allow: ['CONNECT','SPEAK','VIEW_CHANNEL']
        }]},)    
    }

    fs.writeFile ("../profile.json", JSON.stringify(profile), err =>{
        if(err) throw err;
      });
    }
  

    module.exports.help = {
        name: "love"
    }