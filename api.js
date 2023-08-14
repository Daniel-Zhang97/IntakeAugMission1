const express = require('express')

const server = express()

server.listen(8000, () => console.log('server started listening on 8000'))

server.get('/insurance/:make:model', () => )
