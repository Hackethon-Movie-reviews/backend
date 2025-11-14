const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')


router.post('/',(req,res)=>{
    const {movie_id , review ,rating}=req.body
    
})

module.exports=router