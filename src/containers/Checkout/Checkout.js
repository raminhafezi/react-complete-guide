import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: null
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad', '1']
            if (param[0] === 'price') {
                this.setState({ totalPrice: param[1] })
                continue;
            }
            ingredients[param[0]] = +param[1]
        }
        this.setState({ ingredients })
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                {/* <Route path={this.props.match.url + '/contact-data'} component={ContactData} /> */}
                <Route path={this.props.match.url + '/contact-data'}
                    render={() => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />)} />
            </div>
        )
    }
}

export default Checkout;