const router = require('express').Router();
const itemsCtrl = require('../../controllers/items');

router.use(require('../../config/auth'));
router.get('/', checkAuth, itemsCtrl.index);
router.post('/new', checkAuth, itemsCtrl.addItem);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;
