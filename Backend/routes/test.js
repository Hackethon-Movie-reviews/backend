const express = require('express')
const router = express.Router()

router.get('/tt', (req, res) => {
    console.log("GET /test/tt")
    res.send("Ky be")
})

module.exports = router
