const express = require('express');
const {detailStore, list}=require('../controllers/store')
const {regions,stores,products} = require('../models');

const router = express.Router();
router.get('/', list);
router.get('/add', );
router.post('/add');

router.get('/detail/:no', detailStore);
module.exports = router;
