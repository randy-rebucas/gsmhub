const express = require('express');
const router = express.Router();
/**
 * loads middlewares
 */
const auth = require('../middlewares/auth');
/**
 * load controller
 */
const ctrlr = require('../controllers/users');

router.get('/:id', ctrlr.getOne);

router.get('', ctrlr.getAll);

router.post('', auth, ctrlr.create);

router.put('/:id', ctrlr.update);

router.delete('/:id', auth, ctrlr.delete);



module.exports = router;