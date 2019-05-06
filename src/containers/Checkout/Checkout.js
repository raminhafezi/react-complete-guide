import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/CheckoutSummary'


class Checkout extends React.Component {
    state = {
        ingredients: {
            bacon: 1,
            salad: 1,
            meat: 1,
            cheese: 1,
            egg: 1
        }
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/check-out/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        )
    }

}

export default Checkout;