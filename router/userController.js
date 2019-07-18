const account = require('../controllers/lib');

module.exports = function (app) {
    app.post('/login',account.login)
    .post('/signup',account.signup)
    .get('/user', account.findUser)
    .get('/user/:profilId', account.findOneUser)
    .post('/article', account.createArt)
    .get('/article', account.findArt)
    .get('/article/:profilId', account.findOneArt)
    .put('/article/:noteId', account.update)
    .delete('/article/:noteId', account.delete)
    .get('/userArticle/:noteId', account.findUserArt)

    .get('/photos/:photo_profil', account.lireImage);
}
/* const account = require('../controllers/lib');
const express = require('express')
const router = express.Router()

router
    .post('/login',account.login)
    .post('/signup',account.signup)
    .post('/user', account.createUser)
    .post('/login', account.login)
    .get('/user', account.findUser)
    .post('/article', account.createArt)
    .get('/article', account.findArt)
    .get('/article/:id', account.findOne)
    .put('/article/:noteId', account.update)
    .delete('/article/:noteId', account.delete)

module.exports = router; */