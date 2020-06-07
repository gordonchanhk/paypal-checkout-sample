var express = require('express');
var router = express.Router();
var transactionCtlr = require('../controllers/transaction.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Checkout' });
});

/* GET Checkout complete. */
router.post('/complete', function(req, res, next) {
  res.render('complete', { title: 'Checkout Complete', txnId: req.body.txnId });
});

/* Handle order capturing */
router.post('/checkout/capture', transactionCtlr.capture);

module.exports = router;
