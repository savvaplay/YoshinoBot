const { Client, RichEmbed } = require('discord.js')
const client = new Client();
const serverStats = {
  guildID: '604946569963241482',
  memberCountID: '605066668665995275',
  voiceStatsID: '603639789090242571'
};
//const db = require('./db.js');
//const moment = require("moment");
//require("moment-duration-format");
const {
  prefix,
  token,
 } = require('./config.json');
 const ytdl = require('ytdl-core');
 const queue = new Map();



client.on('ready', () => {
  console.log('I am ready!');
  client.user.setStatus('idle');
  client.user.setGame('BETA 0.0.2');
});

client.on('message', message => {
  if(!message.member.voiceChannel) return
  if (message.content === '!!video') {

    const embed = new RichEmbed()
      .setAuthor(`${message.member.voiceChannel.name}`)
      .setDescription(`[Войти в sex комнату](https://discordapp.com/channels/${message.guild.id}/${message.member.voiceChannel.id})`)
      .setColor('#66CED1');
      
    message.delete(0)
    message.channel.send(embed)
  }
});

 client.on('guildMemberAdd', member => {
   if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.memberCountID).setName(`Всего участников : ${member.guild.members.filter(m => !m.user.bot).size}`);
 });

 client.on('guildMemberRemove', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.memberCountID).setName(`Всего участников : ${member.guild.memberCount}`);
 });



let i = 0;
function rainbow(){
    var rainbowArr = ["#f44242","#f44a41","#f45241","#f45e41","#f46a41","#f47941","#f48541","#f49141","#f49d41","#f4ac41","#f4b841","#f4c741","#f4d341","#f4df41","#f4ee41","#e8f441","#dff441","#d9f441","#d3f441","#caf441","#c1f441","#b8f441","#aff441","#a6f441","#9df441","#94f441","#88f441","#7cf441","#73f441","#6af441","#5bf441","#49f441","#41f455","#41f467","#41f476","#41f485","#41f491","#41f49d","#41f4ac","#41f4ca","#41f4df","#41f4f4","#41ebf4","#41dcf4","#41c7f4","#41b2f4","#419df4","#4182f4","#4176f4","#4161f4","#4149f4","#4c41f4","#6741f4","#7c41f4","#8e41f4","#a041f4","#c441f4","#cd41f4","#df41f4","#f441e8","#f441af","#f44185","#f4417c"]
    let rainbow = rainbowArr[i];
    i += 1;
    if(i == 63){
        i = 0;
    }
    return rainbow;
}
client.on("ready", ()=>{
setInterval(()=>{
        client.guilds.find("id","604946569963241482").roles.find("id","605699685914771456").setColor(rainbow());
    },10000)


});

client.on('message', message => {
  if (message.content === '!!help') {

    const embed = new RichEmbed()
    .setTitle('Список комманд:')
    .setDescription(`**!!video** - войти в комнату для трансляций`)
    .setColor('#66CED1');

    message.delete(0)
    message.channel.send(embed)
  }
  });

  
          // Music
  client.once('reconnecting', () => {
    console.log('Reconnecting!');
   });
   
   client.once('disconnect', () => {
    console.log('Disconnect!');
   });
   
   client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
   
    const serverQueue = queue.get(message.guild.id);
   
    if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
    } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
    } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
    //} else {
    //message.channel.send('Вы неправильно ввели комманду!')
    }
   });
   
   async function execute(message, serverQueue) {
    const args = message.content.split(' ');
   
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('Вы должны быть в голосовом канале, чтобы играть музыку!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('Мне нужны разрешения, чтобы присоединиться и говорить в вашем голосовом канале!');
    }
   
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
    title: songInfo.title,
    url: songInfo.video_url,
    };
   
    if (!serverQueue) {
    const queueContruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
    };
   
    queue.set(message.guild.id, queueContruct);
   
    queueContruct.songs.push(song);
   
    try {
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    play(message.guild, queueContruct.songs[0]);
    } catch (err) {
    console.log(err);
    queue.delete(message.guild.id);
    return message.channel.send(err);
    }
    } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send(`${song.title} добавлена в очередь!`);
    }
   
   }
   
   function skip(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('Вы должны быть в голосовом канале, чтобы пропустить музыку.');
    if (!serverQueue) return message.channel.send('Нет песни, которую я мог бы пропустить!');
    serverQueue.connection.dispatcher.end();
   }
   
   function stop(message, serverQueue) {
    if (!message.member.voiceChannel) return message.channel.send('Вы должны быть в голосовом канале, чтобы остановить музыку!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
   }
   
   function play(guild, song) {
    const serverQueue = queue.get(guild.id);
   
    if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
    }
   
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', () => {
    console.log('Music ended!');
    serverQueue.songs.shift();
    play(guild, serverQueue.songs[0]);
    })
    .on('error', error => {
    console.error(error);
    });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
   }



client.login('NTkzODMxMTc5MzU1MDI5NTM3.XThG6w.xMAIPV3UNve_UeACaGYygvaW-2Y');