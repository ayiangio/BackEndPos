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
            connection.query('SELECT * from detailTransaksi', (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllCart: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT menu.idMenu,menu.name,menu.price, menu.image,menu.price, cart.qty from menu INNER JOIN cart ON menu.idMenu = cart.idMenu', (err, result) => {
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
        // console.log(JSON.parse(data))
        return new Promise((resolve, reject) => {
            connection.query('INSERT into detailTransaksi set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postCart: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT into cart set ? ',data, (err, result) => {
                if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    qty: (id,data) => {
        console.log('model ',data)
        console.log('model id ',id)
        return new Promise((resolve, reject) => {
            connection.query('UPDATE cart set ? where idMenu = ? ',[data,Number(id)], (err, result) => {
                    console.log('masuk')
                    if (!err) {                    
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteCart: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('delete from cart where idMenu = ? ',data, (err, result) => {
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