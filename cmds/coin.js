const Discord = require("discord.js");
let coins = require("../profile.json");

module.exports.run = async (client,message,args) =>{
    if(!coins[message.author.id]){
        coins[message.author.id] ={
            coins: 0
        };
    }

    let uCoins = coins[message.author.id].coins;

    let cEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .addField("<a:CoinI:602532590049689608> __Коинов__", "**" + uCoins + "**")
    .setColor("GREEN");

    message.channel.send(cEmbed);
}


module.exports.help ={
    name: "coins"
}