var express = require('express');
var router = express.Router();

const ctlr = require('../controllers/index');

router.get('', ctlr.get);

module.exports = router;
