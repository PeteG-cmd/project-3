// Your backend starts here..

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')

const path = require('path')
const dist = path.join(__dirname, 'dist')

// const uploads = path.join(__dirname, 'uploads')

const { dbURI, port } = require('./config/enviroment')


mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  // This tells us if we've successfully connected!
  (err) => {
    if (err) console.log(err)
    else console.log('Mongoose connected!')
  })


const expressServer = express()
expressServer.use(bodyParser.json())


expressServer.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.url}`)
  next()
})

expressServer.use('/static', express.static(path.join(__dirname, 'uploads')))
expressServer.use('/api', router)
expressServer.use('/', express.static(dist))

expressServer.get('*', function (req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

expressServer.listen(port)

module.exports = {
  expressServer
}
