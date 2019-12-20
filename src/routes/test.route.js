const router = require('express').Router();
const controller = require('../controllers/test.controller');

router.get('/', controller.getTest);
router.post('/', controller.postTest);
router.get('/:id', controller.getTestById);
router.put('/:id', controller.putTest);
router.delete('/:id', controller.deleteTest);

module.exports = router;
