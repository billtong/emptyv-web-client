import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


class DonatePage extends React.Component {

    onToken = (token) => {
        console.log(token);
        fetch('http://localhost:4000/api/stripe', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            response.json().then(data => {
                alert(`We are in business, ${data.email}`);
            });
        }).catch(err=>{
            console.error(err.message);
        });
    };


    render() {

        return (
            <div className="user-page-main-section">
                <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_gfaEjIMbv3afeDitxgeDx3YE"
                />

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
