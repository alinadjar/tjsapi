
const express = require('express');
const router = express.Router();
const APIv1 = require('./V1');
const APIv2 = require('./V2');

router.use('/v1', APIv1);
router.use('/', APIv1);
// router.use('/v2', APIv2);
// router.use('/', APIv2);

module.exports = router;