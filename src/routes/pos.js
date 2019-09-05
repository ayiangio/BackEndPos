var express = require('express')
var router = express.Router()
const postController = require('../controllers/pos')
const multer = require('multer');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })

router
    .get('/menu', postController.getAllMenu)
    .post('/menu',upload.single('image'), postController.postMenu)
    .post('/transaksi', postController.postTransaksi)
    .post('/login', postController.login)
    .post('/register', postController.register)
    .patch('/qtyplus/:idMenu', postController.plus)
    .patch('/qtyminus/:idMenu', postController.minus)
    .post('/cart', postController.cart)
    .get('/cart', postController.getCart)
    .delete('/deleteCart/:idMenu', postController.deletecart)
    .post('/send', postController.send)
    .get('/transaksi', postController.getAllTransaksi)
    

module.exports = router