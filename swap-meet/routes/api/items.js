const router = require('express').Router();
const itemsCtrl = require('../../controllers/items');

router.use(require('../../config/auth'));
router.get('/', checkAuth, itemsCtrl.index);
router.post('/new', checkAuth, itemsCtrl.addItem);
router.post('/new-photo', itemsCtrl.addPhoto);
router.get('/:id', checkAuth, itemsCtrl.showOne);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;
