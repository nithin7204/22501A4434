const express = require('express');
const handler = require('./handler');
const router = express.Router();

router.post('/shorturls', handler.shortenUrl);
router.get('/shorturls/:shortId', handler.getStats);
router.get('/:shortId', handler.redirectUrl);

module.exports = router;