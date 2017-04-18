// calling controller functions when routes are hit
const router = require('express').Router()
const controllers = require('../controllers/controllers')


// user
router.get('/user', controllers.user.get)
router.post('/user', controllers.user.post)

// export router for server.js
module.exports = router