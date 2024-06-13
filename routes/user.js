const {getUserById, getAllUsers} = require('../services/dbService')
var express = require('express');
var router = express.Router();
/* GET home page. */

router.get('/all', async function (req, res, next) {
    res.json(await getAllUsers());
});
router.get('/byId', async function (req, res, next) {
    res.json(await getUserById(req.query.id_user));
});


module.exports = router;
