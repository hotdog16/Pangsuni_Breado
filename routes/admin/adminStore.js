const express = require("express");
const router = express.Router();
const { adminStore,selectListStore, deleteStore} = require("../../controllers/admin/adminStore");
router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get("/", adminStore);

router.get('/selectList', selectListStore);
router.post('/delete', deleteStore);

module.exports = router;