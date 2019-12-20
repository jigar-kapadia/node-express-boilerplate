const router = require('express').Router();
const controller = require('../controllers/test.controller');
router.get('test', controller.getTest);
router.post('test', controller.postTest);
router.get('test/:id', controller.getTestById);
//router.use('test', testRoute);
module.exports = {
    router
}
