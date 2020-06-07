// Paypal button setup

var checkoutConfig = {
  shipping: {
    address1: '5 Temasek Boulevard',
    address2: '#09-01 Suntec Tower Five',
    postalCode: '038985',
    countryName: 'Singapore',
    countryCode: 'SG'
  },
  items: [
    {
      name: 'EBook: The PayPal Wars v1',
      description: 'Battles with eBay, the Media, the Mafia, and the Rest of Planet Earth',
      price: '65.00',
      currency: 'USD',
      quantity: '1',
      sku: 'sku001'
    },
    {
      name: 'EBook: The PayPal Wars v2',
      description: 'Battles with eBay, the Media, the Mafia, and the Rest of Planet Earth',
      price: '61.00',
      currency: 'USD',
      quantity: '1',
      sku: 'sku002'
    }
  ],
  order: {
    total: '65.00',
    currency: 'USD'
  },
  completeUrl: './complete'
};

(function($) {

  function init() {
    updateViewAddr();

    checkoutButtonSetup();
  }

  function checkoutButtonSetup() {
    // paypal button setup
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            "shipping": {
              "address": {
                "address_line_1": checkoutConfig.shipping.address1,
                "address_line_2": checkoutConfig.shipping.address2,
                "admin_area_1": checkoutConfig.shipping.countryName,
                "postal_code": checkoutConfig.shipping.postalCode,
                "country_code": checkoutConfig.shipping.countryCode
              }
            },
            "items": [
              {
                "name": checkoutConfig.items[0].name,
                "description": checkoutConfig.items[0].description,
                "unit_amount": {value: checkoutConfig.items[0].price, currency_code: checkoutConfig.items[0].currency},
                "quantity": checkoutConfig.items[0].quantity
              }
            ],
            "amount": {
              value: checkoutConfig.order.total,
              breakdown: {
                item_total: {value: checkoutConfig.order.total, currency_code: checkoutConfig.order.currency}
              }
            }
          }]
        });
      }
    }).render('#button');
  }

  function updateViewAddr() {
    // update address
    document.getElementById('addrVal').innerHTML =
      checkoutConfig.shipping.address1 + '<br />' +
      checkoutConfig.shipping.address2 + '<br />' +
      checkoutConfig.shipping.postalCode + '<br />' +
      checkoutConfig.shipping.countryName;
  }


  $(document).ready(init);

})(jQuery);