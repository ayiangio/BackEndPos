const pos = require('../models/pos')
require('dotenv').config()
const miscHelper = require('../response/response')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
module.exports = {
    getAllMenu: (req, res) => {
        pos.getAllMenu()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getAllTransaksi: (req, res) => {
        pos.getAllTransaksi()
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    postMenu: async (req, res) => {
        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: process.env.NAME,
                api_key: process.env.APIKEY,
                api_secret: process.env.APISECRET
            })
            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })
            return data
        }
        let newMenu = {
            price: req.body.price,
            name: req.body.name,
            qty: req.body.qty,
            category: req.body.category,
            image: await geturl(),
        };
        pos
            .postMenu(newMenu)
            .then((result) => {
                miscHelper.response(res, newMenu, 200);
            })
            .catch((err) => {
                console.log(err)
            });
    },
    postTransaksi: (req, res) => {
        const detail = JSON.stringify(req.body.menu)
        console.log(detail)
        const data = {
            idTransaksi: req.body.idTransaksi,
            total: req.body.total,
            detail : detail,
            date: new Date()
        }
        // const item = req.body.menu
        // console.log('array ',item)
        // console.log('array ',item[0])
        // const item={
        //     idTransaksi : req.body.idTransaksi,
        // }
        pos.postTransaksi(data)
            .then((result) => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    cart: (req, res) => {
        const data = {
            idMenu: Number(req.body.idMenu),
            // idUser: Number(req.body.idUser),
            qty: Number(req.body.qty),
            date: new Date()
        }
        pos.postCart(data)
            .then((result) => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    plus: (req, res) => {
        console.log(req.body.qty)
        const data = {
            qty: Number(req.body.qty) + 1,
        }
        pos.qty(Number(req.params.idMenu),data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    minus: (req, res) => {
        const data = {
            qty: Number(req.body.qty) -  1,
        }
        pos.qty(Number(req.params.idMenu),data)
            .then((result) => {
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getCart: (req, res) => {
        pos.getAllCart()
            .then((result) => {
                let data = result
                let total = 0
                result.map((item,key)=>{                    
                    total = (item.price*item.qty)+total                    
                })
                console.log (total)
                miscHelper.response(res, data, 200,null,total)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deletecart: (req, res) => {
        const data = Number(req.params.idMenu)
        pos.deleteCart(data)
            .then((result) => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    register: (req, res) => {
        const salt = miscHelper.getRandomSalt(25)
        const passHash = miscHelper.setPass(req.body.password, salt)
        const data = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: passHash.passHash,
            salt: passHash.salt,
        }
        pos.register(data)
            .then((resultUser) => {
                miscHelper.response(res, resultUser, 200)
            })
            .catch((err) => {
                console.log(err)
                return miscHelper.response(res, null, 404, "Email Not Avaliable !!!")
            })
    },
    login: (req, res) => {
        const email = req.body.email
        const pass = req.body.password
        pos.getByEmail(email)
            .then((result) => {
                const dataUser = result[0]
                console.log(result)
                const userPass = miscHelper.setPass(pass, dataUser.salt).passHash
                if (userPass === dataUser.password) {
                    dataUser.token = jwt.sign({
                        idUser: dataUser.idUser
                    }, process.env.SECRET_KEY, {
                            expiresIn: '120h'
                        })

                    delete dataUser.salt
                    delete dataUser.password
                    return miscHelper.response(res, dataUser, 200)
                } else {
                    return miscHelper.response(res, null, 403, "Wrong Password !!!")
                }
            })
            .catch((err) => {
                console.log(err)
                return miscHelper.response(res, null, 403, "Email Not Register !!!")
            })
    },
    send: (req, res, next) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.body.email,
            from: 'admin@ayiangio.com',
            subject: 'Recipts From Ayi',
            text: 'Go green brayy !!!!!!!!!!! :) :*',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg)
            .then((result) => {
                return miscHelper.response(res, "Email Terkirim", 200)
            })
            .catch((err)=>{
                return miscHelper.response(res, null, 404, "Email Salah")                
            })
        // next()
    }
}