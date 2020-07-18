const router = require('express').Router();
const swapSitesCtrl = require('../../controllers/swapSites');

router.use(require('../../config/auth'));
router.get('/', swapSitesCtrl.index);
router.post('/new', checkAuth, swapSitesCtrl.addSite);
router.put('/:id', checkAuth, swapSitesCtrl.linkItem);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;