const Discord = module.require("discord.js");
const prof = require("../profile.json");

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay;
    var mDisplay;
    var sDisplay;
    if(h == 0)
    {
        hDisplay = "00"
    }
    if(h>0 && h<10)
    {
        hDisplay = 0 + "**"+h+"**"
    }
    if(h>9)
    {
        hDisplay = "**" + h + "**"
    }
    if(m == 0)
    {
        mDisplay = "00"
    }
    if(m>0 && m<10)
    {
        mDisplay = 0 + "**"+m+"**"
    }
    if(m>9)
    {
        mDisplay = "**" + m + "**"
    }
    if(s == 0)
    {
        sDisplay = "00"
    }
    if(s>0 && s<10)
    {
        sDisplay = 0 + "**"+s+"**"
    }
    if(s>9)
    {
        sDisplay = "**" + s + "**"
    }
    return hDisplay + ":"+ mDisplay +":"+ sDisplay;
}

module.exports.run = async (client,message,args) => {










}
module.exports.help = {
    name: "voice"
};