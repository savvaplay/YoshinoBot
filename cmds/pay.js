const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../profile.json");

module.exports.run = async (client,message,args) =>{

    if(!coins[message.author.id]){
        return message.reply("У вас нет столько коинов!")
    }

    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!coins[pUser.id]){
        coins[pUser.id] ={
            coins: 0
        };
    }

    let pCoins = coins[pUser.id].coins;
    let sCoins = coins[message.author.id].coins;
    let cEmb = new Discord.RichEmbed()
.setTitle("Передача коинов")
.setDescription(`${message.author} передал ${pUser} __**${args[1]}**__ коинов.`)
.setColor("GREEN");


    if(sCoins < args[0]) return message.reply("У вас не хватает коинов!");

    coins[message.author.id] ={
        coins: sCoins - parseInt(args[1])
    };

    coins[pUser.id] ={
        coins: pCoins + parseInt(args[1])
    };

    message.channel.send(cEmb);

    fs.writeFile("../profile.json", JSON.stringigy(coins), (err) => {
        if(err) console.log(err)
    });
}



module.exports.help ={
    name: "pay"
}