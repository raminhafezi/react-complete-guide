import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

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
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        for (let param of query.entries()) {
            //['salad', '1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients})
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
                <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>
        )
    }

}

export default Checkout;