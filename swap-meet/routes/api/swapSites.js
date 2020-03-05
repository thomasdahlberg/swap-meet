const router = require('express').Router();
const swapSitesCtrl = require('../../controllers/swapSites');

router.use(require('../../config/auth'));
router.get('/', checkAuth, swapSitesCtrl.index);
router.post('/new', checkAuth, swapSitesCtrl.addItem);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;