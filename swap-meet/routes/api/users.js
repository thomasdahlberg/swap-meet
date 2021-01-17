const router = require('express').Router();
const usersCtrl = require('../../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/:id/items', usersCtrl.getMyItems);
router.get('/:id/meets', usersCtrl.getMyMeets);

module.exports = router;