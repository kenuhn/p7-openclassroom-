const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path         = require('path');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'));

const routesUtilisateur = require('./routes/utilisateur')
const routesPost = require('./routes/post')
const routesComm = require('./routes/commentaires')

app.use('/images_post', express.static(path.join(__dirname, 'images_post')))
app.use('/api', routesUtilisateur)
app.use('/api', routesPost)
app.use('/api', routesComm)

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
