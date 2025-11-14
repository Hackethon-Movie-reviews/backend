const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')


router.post('/', (req, res) => {
    const { movie_id, review, rating } = req.body
    const pp = req.headers.userId
    console.log(pp)
    const sql = "INSERT INTO reviews (movie_id, review, rating, user_id) VALUES (?,?,?,?)";
    pool.query(sql, [movie_id, review, rating, req.headers.userId], (err, data) => {
        res.send(result.createResult(err, data))
    })

})

router.put('/', (req, res) => {
    const { movie_id, review, rating } = req.body
    const pp = req.headers.userId
    console.log(pp)

    const sql = "update reviews set review = ? ,rating = ?  WHERE user_id= ? and movie_id= ?;"
    pool.query(sql, [review, rating, req.headers.userId, movie_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

router.delete('/', (req, res) => {
    const { movie_id } = req.body
    const sql = `DELETE FROM reviews WHERE user_id = ? AND movie_id = ?`

    pool.query(sql, [userId, movie_id], (err, data) => {
        res.send(result.createResult(err, data))
    })
})

router.get('/', (req, res) => {
    const sql = "SELECT * FROM reviews WHERE user_id != ? "

    pool.query(sql, [req.headers.userId], (err, data) => {
        res.send(result.createResult(err, data))
    })
})



router.get('/my', (req, res) => {
    const userId = req.headers.userid
    const sql =
        `
    SELECT 
        r.id,
        r.review,
        r.rating,
        r.movie_id,
        m.title AS movie_title,
        m.image_url
    FROM reviews r
    INNER JOIN movies m ON r.movie_id = m.id
    WHERE r.user_id = ? 
    
    `



    pool.query(sql, [req.headers.userId], (err, data) => {
        res.send(result.createResult(err, data))
    })
})






module.exports = router