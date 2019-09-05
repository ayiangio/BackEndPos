require('dotenv').config();
const express = require('express');
const app = express();
const Cors = require('cors')
const port = process.env.PORT || 3333
const bodyPraser = require('body-parser')
const logger = require('morgan')
const pos = require('./src/routes/pos');
app.use(Cors())
app.use(
	bodyPraser.urlencoded({
		extended: true
	})
);
app.use(bodyPraser.json());

app.listen(port);

console.log('Connect Succes On '+port);
app.use(logger('dev'))
app.use('/pos', pos)
