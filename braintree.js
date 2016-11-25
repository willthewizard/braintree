var express = require("express");
var app = express();
var braintree = require("braintree");
app.set('view engine', 'jade');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/test', function(req, res) {
    res.sendFile('./index.html', {root: __dirname })
});
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});



/*** Enable CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});



var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "4hvrbrcrsbztbygg",
  publicKey: "bmw8rd2wngw559ct",
  privateKey: "4e13eb896a7ed6487e6ca2e5f34e0b05"
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.post("/checkout", function (req, res) {

  var nonceFromTheClient = req.body.payment_method_nonce;
  console.log(req.body);
  console.log(nonceFromTheClient);
  // Use payment method nonce here
  gateway.transaction.sale({
  amount: "10.00",
  paymentMethodNonce: nonceFromTheClient,
  options: {
    submitForSettlement: true
  }
}, function (err, result) {
	console.log(result);
});


});