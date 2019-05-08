import React from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClass from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            state: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Ramin',
                address: {
                    suburb: 'Wollstonecraft',
                    zip_code: '2065',
                    country: 'Australia'
                },
                Email: 'john.smith@email.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                console.log(' BurgerBuilder Axios Response:  ', response)
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(' BurgerBuilder Axios Error:  ', err)
            })
        // this.setState({ purchasing: true });
        // console.log(this.props.ingredients);
    }
    render() {
        return (
            <div className={cssClass.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input className={cssClass.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={cssClass.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={cssClass.Input} type="text" name="street" placeholder="Street Name" />
                    <input className={cssClass.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>

                </form>
            </div>
        )
    }
}


export default ContactData;