const paypal = require('@paypal/checkout-server-sdk');

let clientId = process.env.paypalClientId;
let clientSecret = process.env.paypalClientSecret;
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);


let captureOrder =  async function(orderId, mockError) {
	console.log("orderId: " + orderId);

	let captureResponse;

	//request = new paypal.orders.OrdersCaptureRequest(orderId);
	var captureReq = {
		path: '/v2/checkout/orders/' + orderId + '/capture?',
		verb: 'POST',
		body: { intent: 'INVALID' },
		headers:
		{ 'Content-Type': 'application/json' }
	};

	if ( mockError === 'true' ) {
		captureReq.headers['PayPal-Mock-Response'] = '{"mock_application_codes":"INSTRUMENT_DECLINED"}';
	}

	try {
		captureResponse = await client.execute(captureReq);
		let captureResult = captureResponse.result;
		let txnId = '';

		console.log(`${JSON.stringify(captureResult)}`);

		for(var i=0; i<captureResult.purchase_units.length; i++){
			for(var j=0; j<captureResult.purchase_units[i].payments.captures.length; j++){

				if ( captureResult.purchase_units[i].payments.captures[j].final_capture === true ) {
					txnId = captureResult.purchase_units[i].payments.captures[j].id;
				}
			}
		}

		return { txnId: txnId };

	} catch ( err ) {
		console.log('catch err');
		console.log(err);
		return err;
	}
}


exports.capture = function(req, res) {

	let captureResponse = captureOrder(req.body.orderID, req.body.mockError);

	let txnId = '';

	captureResponse
	.then(function(data) {

		if ( typeof data.txnId === 'undefined' ) {
			res.status(400);
			return res.end( data.message );
		} else {
			res.end(JSON.stringify({ txnId: data.txnId }));
		}

	});

};