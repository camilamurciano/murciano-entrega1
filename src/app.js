
const express = require('express');
const { port } = require('./config/server.config')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const router = require('./router')

const app = express();

app.use(express.json())
app.use(express.static(process.cwd() + '/src/public'))

router(app)

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'handlebars')

//nueva forma de conectar servidor
const httpServer = app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`Usuario con id: ${socket.id} conectado`)

    io.emit('updateProducts', 'fuck');
})



//const port = 8000;

//app.listen(port, () => {
  //  console.log(`Server running at port ${port}`)
//})