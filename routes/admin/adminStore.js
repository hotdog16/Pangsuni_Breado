const express = require("express");
const router = express.Router();
const { adminStore,selectListStore, deleteStore,selectOneStore,addStore,addStore2,modifyStore} = require("../../controllers/admin/adminStore");
const {isLoggedIn}=require('../../middlewares/index');
const {upload} = require('../../middlewares/uploads');
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/", adminStore);

router.get('/selectList', selectListStore);
router.get('/selectOne/:s_no', selectOneStore);
router.post('/delete', deleteStore);
router.get('/add',isLoggedIn, addStore);
router.post('/add',isLoggedIn, upload.single('s_img'),addStore2);
router.post('/modify',isLoggedIn, upload.single('s_img'),modifyStore);
module.exports = router;