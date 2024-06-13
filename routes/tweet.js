const {getTweetById, getAllTweet, getAllTweetByUserId} = require('../services/dbService')
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

module.exports = router;
