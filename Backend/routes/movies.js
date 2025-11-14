const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')


router.get('/', (req, res) => {
    const sql = "SELECT * FROM movies;"
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})
module.exports = router