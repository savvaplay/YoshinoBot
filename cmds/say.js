const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (client,message,args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
};
module.exports.help = {
    name: "say"
};