const express = require('express');
const router = express.Router();
/**
 * load controller
 */
const ctlr = require('../controllers/auth');


router.post('/register', ctlr.register);

router.post('/login', ctlr.login);

router.post('/checkEmail', ctlr.checkEmail);

router.get('/:id', ctlr.get);

router.put('/:id', ctlr.update);

module.exports = router;