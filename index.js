const express = require('express');
const {ExpressPeerServer} = require('peer');
const app = express();
const cors = require('cors');

app.enable('trust proxy');
// Configurar CORS
app.use(cors());

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const peerServer = ExpressPeerServer(server, {
    port: port,
    debug: true,
    path: '/myapp',
    key: 'peerjs',
});



app.use('/peerjs', peerServer);

app.get('/', function(req,res){
    res.send('Running PeerServer on port: '+port)
})

// //on conect 
// peerServer.on('connection', (client) => {
//     console.log('Client connected', client.id);
// });

// //on disconnect
// peerServer.on('disconnect', (client) => {
//     console.log('Client disconnected', client.id);
// } );