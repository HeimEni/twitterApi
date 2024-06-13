const {createShare, reply,createLike,getAllReplyByTweetId, getAllLikeByTweetId, haveLike} = require('../services/dbService')
const {login, register} = require('../services/accountService')
var express = require('express');
const {json} = require("express");
const {status} = require("express/lib/response");
var router = express.Router();
/* GET home page. */

router.get('/reply', async function (req, res, next) {
    res.json(await getAllReplyByTweetId(req.query.tweet_id));
});
router.get('/like', async function (req, res, next) {
    res.json(await getAllLikeByTweetId(req.query.tweet_id));
});
router.post('/like/new', async function (req, res, next) {
    await createLike(req.body.tweet_id, req.body.user_id);
    // res.json({})
});
router.post('/share', async function (req, res, next) {
    await createShare(req.body.tweet_id, req.body.user_id);
    // res.json({})
});
router.post('/reply', async function (req, res, next) {
    await reply(req.body.tweet_id, req.body.user_id, req.body.text);
    // res.json({})
});
router.post('/haveLike', async function (req, res, next) {
    return await haveLike(req.body.tweet_id);
});
router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    const user = await login(username, password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json(false);
    }
});
router.post('/register', async function (req, res, next) {
    const { username, password } = req.body;
    const user = await register(username, password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json(false);
    }});


module.exports = router;
