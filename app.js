const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv/config')

//MIDDLEWARE
//COFIGURE CORS
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials : true
  })
)

//IMPORT ROUTER
app.use('/posts', require('./routes/posts'))
app.use('/users', require('./routes/users'))

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION,
{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },() =>
  console.log('connected to db!!')
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
 db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});

//HOW TO START LISTENING TO SERVER
app.listen(3006);
