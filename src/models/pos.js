require('dotenv').config()
const connection = require('../config/db')
module.exports = {
    getAllMenu: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM menu', (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllTransaksi: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from transaksi', (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postMenu: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT into menu set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postTransaksi: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT into transaksi set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    register: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })                       
        })
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT idUser, email, fullName, salt, password FROM user WHERE email = ?', email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })

        })
    },
}