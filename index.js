const express = require('express');
const app = express();
const {ExpressPeerServer} = require('peer');

app.enable('trust proxy');

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp'
});

app.use('/peerjs', peerServer);

//on conect 
peerServer.on('connection', (client) => {
    console.log('Client connected', client.id);
});

//on disconnect
peerServer.on('disconnect', (client) => {
    console.log('Client disconnected', client.id);
} );