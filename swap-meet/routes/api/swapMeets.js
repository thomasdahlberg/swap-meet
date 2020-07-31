const router = require('express').Router();
const swapMeetCtrl = require('../../controllers/swapMeets');

router.use(require('../../config/auth'));
router.get('/', checkAuth, swapMeetCtrl.index);
router.get('/:id', checkAuth, swapMeetCtrl.showOne);
router.put('/:id',checkAuth,swapMeetCtrl.updateOne);
router.post('/new', checkAuth, swapMeetCtrl.addOffer);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;