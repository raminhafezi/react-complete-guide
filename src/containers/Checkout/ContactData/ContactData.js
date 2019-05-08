import React from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClass from './ContactData.css'


class ContactData extends React.Component{
    state = {
        name: '',
        email: '',
        address: {
            state: '',
            postalCode: ''
        }
    }

    render () {
        return (
            <div className={cssClass.ContactData}>
                <h4>Enter your contact data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street Name" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success">ORDER</Button>

                </form>
            </div>
        )
    }
}


export default ContactData;