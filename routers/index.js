const express = require('express')
const user = require('./user')
const loan = require('./loan')
const router = express.Router()

router.use(user)
router.use(loan)


module.exports = router
