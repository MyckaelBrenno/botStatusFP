const config = require("./config.json");

const { Client, Intents } = require('discord.js');
const { default: axios, Axios } = require("axios");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on("ready", () => {
    console.log(`Bot foi iniciado com sucesso!`);

    const axios = require('axios').default;

    const canal = client.channels.cache.get('927573905458212955');

    isMsgErrorEnviado = false;

 setInterval(() => {
    axios({
        method: 'get',
        url: 'http://localhost:8080/cliente/1',
        //timeout: 2000

    }).then(function (response) {
        
        if (isMsgErrorEnviado) {
            console.log("Status: " + response.status);
            console.log(response.statusText);
            canal.send({ content: response.statusText + ", o serviço do MS está de volta!" });
            isMsgErrorEnviado = false;
        }
        // message.channel.send(response.statusText + ", Status 200!");

    }).catch(function (error) {

        if (!isMsgErrorEnviado) {
            isMsgErrorEnviado = true;
            console.log("Status: " + error.status);
            console.log("StatusText: " + error.statusText);
            canal.send({ content: error.statusText + ", O Portal Farmácia do MS está fora do ar!" });
        }
        //message.reply(error.statusText + ", Error!");
    })

}, 10000);

})

client.login(config.token);

/*
client.on("messageCreate", function (message) {
    if (message.author.bot) return;

});
*/

/*
 client.on("messageCreate", function (message) {
     if (message.author.bot) return;

     //Ping
     var ping = require('ping');
     var hosts = ['100.126.2.206', '100.127.6.150', '100.126.2.218'];
     hosts.forEach(function (host) {
         ping.sys.probe(host, function (isAlive) {
             var msg = isAlive ? 'host ' + host + ' está ativo' : 'host ' + host + ' está morto';
             console.log(msg);

             if (message.content === "ping"){
                 message.reply(msg);
             }
         });
     });
 });
*/

//**Comando para criar as REQUIREMENTS das dependências do projeto */
//pip freeze > requirements.txt