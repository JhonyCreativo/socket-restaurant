/**                  
 *  _____    _____ ___________ _______  ____  
 *  \__  \  /     \\____ \__  \\_  __ \/  _ \ 
 *   / __ \|  Y Y  \  |_> > __ \|  | \(  <_> )
 *  (____  /__|_|  /   __(____  /__|   \____/ 
 *       \/      \/|__|       \/              
 * 
 * Simple server for learning pourposes only, this is NOT for a production enviroment.
 *
 */
 const http = require('http')
 const express = require('express')
 const path = require('path')
 const cors = require('cors')
 const bodyparser = require('body-parser')
 // const Users = require('./controllers/users.controller.js')
 const app = express()
 
 // const us = new Users()
 
 // -------------------------------------------------------------
 // Simple api endpoint for fake login users
 // -------------------------------------------------------------
 app.use(cors())
 
 app.use(bodyparser.urlencoded({
     extended: true
 }))
 
 app.use(bodyparser.json())
 
 
 // -------------------------------------------------------------
 // Send to the Vue front all GET requests
 // -------------------------------------------------------------
 app.use(express.static(path.resolve(__dirname, '../vue-chat-front/dist/')))
 
 app.get('*', (req, res) => {
 
     // res.sendFile(path.resolve(__dirname, '../vue-chat-front/dist/', './index.html'))
     console.log("Ready");
 
 });
 
 // -------------------------------------------------------------
 // Socket.IO
 // -------------------------------------------------------------
 const server = http.createServer(app)
 const io = require('socket.io')(server)
 
 io.on('connection', (socket) => {
     console.log("new Conection :"+socket.id)
 
     socket.on('GET_PEDIDO_MESA', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_PEDIDO_MESA', message)
 
     })
     socket.on('GET_MESSAGE', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_MESSAGE', message)
 
     })
     socket.on('GET_NOTIFICACION', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_NOTIFICACION', message)
 
     })
     socket.on('GET_LLAMADA', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_LLAMADA', message)
 
     })
     socket.on('GET_PRINT', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_PRINT', message)
 
     })
     socket.on('GET_INTRANET', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_INTRANET', message)
 
     })
 
     socket.on('GET_INTRANET_MESERO', (message) => {
         console.log(message);
         // To all users except sender
         socket.broadcast.emit('SET_INTRANET_MESERO', message)
 
     })
 
     
 })
 
 // -------------------------------------------------------------
 // Server Up
 // -------------------------------------------------------------
 server.listen(process.env.PORT || '3006', function () {
 
     console.log('Server app listening on port 3006!')
 
 });