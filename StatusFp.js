const config = require("./config.json");

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on("ready", () => {
    console.log(`Bot foi iniciado com sucesso!`)
})

// client.on("messageCreate", function (message) {
//     if (message.author.bot) return;

//     //Ping
//     var ping = require('ping');
//     var hosts = ['100.126.2.206', '100.127.6.150', '100.126.2.218'];
//     hosts.forEach(function (host) {
//         ping.sys.probe(host, function (isAlive) {
//             var msg = isAlive ? 'host ' + host + ' está ativo' : 'host ' + host + ' está morto';
//             console.log(msg);

//             if (message.content === "ping"){
//                 message.reply(msg);
//             }
//         });
//     });
// });

const axios = require('axios').default;

client.on("messageCreate", function (message) {
    if (message.author.bot) return;

    axios({
        method: 'get',
        url: 'https://farmaciapopular-portal.saude.gov.br/farmaciapopular-portal/login.jsf',
    }).then(function (response) {
        console.log(response.status);
        console.log(response.statusText);

        message.reply(response.statusText + ", Status 200" );
        //message.reply(response.status);
    }).catch(function (error) {
        console.log(error.status);
        console.log(error.statusText);
        console.log(error.headers);
        message.reply(error.statusText + ", Error!");
    })

});

client.login(config.token);

//**Comando para criar as REQUIREMENTS das dependências do projeto */
//pip freeze > requirements.txt