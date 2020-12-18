const express = require('express');
const router = express.Router();
/**
 * loads middlewares
 */
const dhru = require('../middlewares/dhru');
/**
 * load controller
 */
const ctrlr = require('../controllers/dhru');
// accountInfo
router.post('/accountInfo', dhru, ctrlr.accountInfo);
// allServices
router.post('/allServices', dhru, ctrlr.allServices);
// imeiService
router.post('/imeiService', dhru, ctrlr.imeiService);
// imeiServiceDetails
router.post('/imeiServiceDetails', dhru, ctrlr.imeiServiceDetails);
// modelService
router.post('/modelService', dhru, ctrlr.modelService);
// providerService
router.post('/providerService', dhru, ctrlr.providerService);
// mepServices
router.post('/mepServices', dhru, ctrlr.mepServices);
// imeiOrderDetail
router.post('/imeiOrderDetail', dhru, ctrlr.imeiOrderDetail);
// fileServices
router.post('/fileServices', dhru, ctrlr.fileServices);
// fileOrder
router.post('/fileOrder', dhru, ctrlr.fileOrder);
// fileOrderDetail
router.post('/fileOrderDetail', dhru, ctrlr.fileOrderDetail);
// imeiOrder
router.post('/imeiOrder', dhru, ctrlr.imeiOrder);
// bulkOrder
router.post('/bulkOrder', dhru, ctrlr.bulkOrder);

module.exports = router;