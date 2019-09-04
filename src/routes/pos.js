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
    .post('/send', postController.send)
    .get('/transaksi', postController.getAllTransaksi)
    

module.exports = router