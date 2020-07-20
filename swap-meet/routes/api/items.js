const router = require('express').Router();
const itemsCtrl = require('../../controllers/items');

router.use(require('../../config/auth'));
router.get('/', itemsCtrl.index);
router.post('/new', checkAuth, itemsCtrl.addItem);
router.get('/:id', checkAuth, itemsCtrl.showOne);
router.put('/:id',checkAuth, itemsCtrl.updateOne);
router.delete('/:id',checkAuth, itemsCtrl.deleteItem);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;
