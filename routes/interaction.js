const {createShare, reply,createLike,getAllReplyByTweetId, getAllLikeByTweetId} = require('../services/dbService')
var express = require('express');
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


module.exports = router;
