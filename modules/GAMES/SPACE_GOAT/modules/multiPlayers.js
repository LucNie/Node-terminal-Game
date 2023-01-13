require('dotenv').config()


function host() {

    const io = require('socket.io')(process.env.SPACE_GOAT_PORT)
    // cors
    io.origins('*:*')


    let players = [] 

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
        // Les clients envoient la position de sont joueur au serveur
        socket.on('req.playerTransform', (data) => {

        })

        socket.on('req.join', (data) => {
            players.push(data)
            console.log(players)
        })

        socket.on('req.leave', (data) => {
            players.splice(players.indexOf(data), 1)
            console.log(players)
        })

        socket.on('req.chat', (data) => {
            io.broadcast.emit('res.chat', data)
        })

        socket.on('req.generalInfo', (data) => {
            socket.emit('res.generalInfo', {
                players: players
            })
        })
        socket.emit('res.id', {
            
    })

}

function join() {

    let _id = 0

    const io = require('socket.io-client')
    const socket = io(`http://localhost:${process.env.SPACE_GOAT_PORT}`)
    const dataController = require('./dataController.js')
    socket.on('connect', () => {

    })

    socket.on('res.generalInfo', (data) => {
        console.log(data)
    })

    socket.on('res.chat', (data) => {
        console.log(data)
    })

    socket.emit('req.generalInfo', {})

}