
const express = require('express')
const router = express.Router()
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')



// router.get('/tt', (req, res) => {
//     res.send("User route working!")
// })




router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, phone ,birth} = req.body
    const encryptedPassword = String(cryptoJs.SHA256(password))
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile ,birth) VALUES(?,?,?,?,?,?)`
    pool.query(
        sql,
        [first_name, last_name, email, encryptedPassword, phone,birth],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.put('/updatepass', (req, res) => {
    const { newPassword } = req.body
    const encryptedPassword = String(cryptoJs.SHA256(newPassword))
    const sql = `UPDATE users SET password =? WHERE id=?`
    pool.query(
        sql,
        [ encryptedPassword,req.headers.userId],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})





router.post('/login', (req, res) => {
  const { email, password } = req.body
  const encryptedPassword = String(cryptoJs.SHA256(password))
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
  pool.query(sql, [email, encryptedPassword], (error, data) => {
    if (data) {
      if (data.length != 0) {
        const payload = {
          userId: data[0].id,
        }
        const token = jwt.sign(payload, config.secret)
        const body = {
          token: token,
          first_name: data[0].first_name,
          last_name: data[0].last_name,
        }
        res.send(result.createSuccessResult(body))
      } else res.send(result.createErrorResult('Invalid email or password'))
    } else res.send(result.createErrorResult(error))
  })
})

router.get('/profile', (req, res) => {
  const sql = `SELECT first_name, last_name, email, password, mobile ,birth FROM users WHERE id = ?`
  pool.query(sql, [req.headers.userId], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.put('/profile', (req, res) => {
  const { first_name, last_name, mobile ,birth} = req.body
  const sql = `UPDATE users SET first_name=?, last_name=?, mobile=? , birth=? WHERE id = ?`
  pool.query(
    sql,
    [first_name, last_name, mobile ,birth, req.headers.userId],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})



module.exports = router



































// const express = require('express')
// // const cryptoJs = require('crypto-js')
// // const jwt = require('jsonwebtoken')

// // const pool = require('../db/db')
// // const result = require('../utils/result')
// // const config = require('../utils/config')

// const router = express.Router()

// console.log("hrllo");

// router.get('/tt', (req, res) => {
//     console.log(".get")
//     res.send("Ky be")
// });

// // router.post('/register', (req, res) => {
// //     console.log("in /register")
// //     const { first_name, last_name, email, password, mobile } = req.body
// //     const encryptedPassword = String(cryptoJs.SHA256(password))
// //     const sql = `INSERT INTO users(first_name, last_name, email, password, mobile ,birth) VALUES(?,?,?,?,?)`
// //     console.log("in /register 2")

// //     pool.query(
// //         sql,
// //         [first_name, last_name, email, encryptedPassword, mobile],
// //         (error, data) => {
// //             res.send(result.createResult(error, data))
// //         }
// //     )

// // })

// // router.post('/login', (req, res) => {
// //     const { email, password } = req.body
// //     const encryptedPassword = String(cryptoJs.SHA256(password))
// //     const sql = `SELECT * FROM user WHERE email = ? AND password = ?`
// //     pool.query(sql, [email, encryptedPassword], (error, data) => {
// //         if (data) {
// //             if (data.length != 0) {
// //                 const payload = {
// //                     userId: data[0].id,
// //                 }
// //                 const token = jwt.sign(payload, config.secret)
// //                 const body = {
// //                     token: token,
// //                     first_name: data[0].first_name,
// //                     last_name: data[0].last_name,
// //                 }
// //                 res.send(result.createSuccessResult(body))
// //             } else res.send(result.createErrorResult('Invalid email or password'))
// //         } else res.send(result.createErrorResult(error))
// //     })
// // })

// // router.get('/profile', (req, res) => {
// //     const sql = `SELECT first_name, last_name, mobile, email FROM user WHERE id = ?`
// //     pool.query(sql, [req.headers.userId], (error, data) => {
// //         res.send(result.createResult(error, data))
// //     })
// // })

// // router.put('/profile', (req, res) => {
// //     const { first_name, last_name, mobile } = req.body
// //     const sql = `UPDATE user SET first_name=?, last_name=?, mobile=? WHERE id = ?`
// //     pool.query(
// //         sql,
// //         [first_name, last_name, mobile, req.headers.userId],
// //         (error, data) => {
// //             res.send(result.createResult(error, data))
// //         }
// //     )
// // })

// module.exports = router




















