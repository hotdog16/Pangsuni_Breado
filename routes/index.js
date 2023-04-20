const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main');
});
router.post('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/login', function (req, res, next) {
    res.render('join');
});
router.post('/login', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/join', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/join', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/board', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/board', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
module.exports = router;
