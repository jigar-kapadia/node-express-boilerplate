const router = require('express').Router();
const controller = require('../controllers/customer.controller');

router.get('/', controller.getCustomer);
router.post('/', controller.postCustomer);
router.get('/:id', controller.getCustomerbyId);
router.put('/:id', controller.putCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;