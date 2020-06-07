const paypal = require('@paypal/checkout-server-sdk');

let clientId = "AbH1wK350KsM50wu8XfzvbnN2B3Sn4PjCzzJGEA3-wIaG7zSbgNgyphVPdW0p1luiJR1XRr5yCQmeL0S";
let clientSecret = "EAmLMHHfryzaeiOQZ1WiB6Kq6AKwZxX_SvzwFYGzT0h5ql3Q9KAsyxn0kQZgS57Ok7kJEngcPA1gzMwV";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);


let captureOrder =  async function(orderId, mockError) {
	console.log("orderId: " + orderId);
  request = new paypal.orders.OrdersCaptureRequest(orderId);

  let captureResponse;

  try {
		captureResponse = await client.execute(request);
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
				res.status(500);
				return res.end( data.message );
			} else {
				res.end(JSON.stringify({ txnId: data.txnId }));
			}

		});

};