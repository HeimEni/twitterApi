const {createTweet,getTweetById, getAllTweet, getAllTweetByUserId} = require('../services/dbService')
var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/all', async function (req, res, next) {
    res.json(await getAllTweet());
});
router.get('/byIdUser', async function (req, res, next) {
    res.json(await getAllTweetByUserId(req.query.id_user));
});
router.get('/byId', async function (req, res, next) {
    res.json(await getTweetById(req.query.id));
});
router.post('/new', async function (req, res, next) {
    res.json(await createTweet(req.body.text, req.body.id_user));
});

module.exports = router;
