const express = require('express')
const cors = require('cors')
const authorization = require('./middleware/authorization')
const userRouter = require('./routes/user')
const testRouter = require('./routes/test')
const movies = require('../Backend/routes/movies')
const review = require('../Backend/routes/review')



const app = express()
const port = 3099

app.use(express.json())
app.use(cors())

app.use(authorization)

app.use('/test', testRouter)
app.use('/user', userRouter)
app.use('/movies', movies)
app.use('/review', review)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
