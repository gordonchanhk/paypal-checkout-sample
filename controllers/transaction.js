const paypal = require('@paypal/checkout-server-sdk');

let clientId = "AbH1wK350KsM50wu8XfzvbnN2B3Sn4PjCzzJGEA3-wIaG7zSbgNgyphVPdW0p1luiJR1XRr5yCQmeL0S";
let clientSecret = "EAmLMHHfryzaeiOQZ1WiB6Kq6AKwZxX_SvzwFYGzT0h5ql3Q9KAsyxn0kQZgS57Ok7kJEngcPA1gzMwV";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

exports.capture = function(req, res) {



};