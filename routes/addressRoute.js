const express = require('express');
const { createAddress, updateAddress, deleteAddress } = require('../controllers/address');

const router = express.Router();

router.post('/create', createAddress);
router.put('/update', updateAddress);
router.delete('/delete', deleteAddress);

module.exports = router;