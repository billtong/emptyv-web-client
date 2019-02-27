import React from 'react';


class DonatePage extends React.Component {

  render() {
    return (
      <div className="user-page-main-section">
        <form action="http://localhost:4000/api/stripe/charge" method="POST">
          <script
            src="https://checkout.stripe.com/checkout.js" className="stripe-button"
            data-key="pk_test_gfaEjIMbv3afeDitxgeDx3YE"
            data-amount="999"
            data-name="BT"
            data-description="Example charge"
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="auto"
            data-currency="cad">
          </script>
        </form>
      </div>
    );
  }
}
module.exports = DonatePage;
