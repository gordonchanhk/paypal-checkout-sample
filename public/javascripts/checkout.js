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