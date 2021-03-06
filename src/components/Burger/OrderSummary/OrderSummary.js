import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}: </span>
                {props.ingredients[igKey]}
            </li>);
    });

    return (
        <Aux>
            <h4> Your Order</h4>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <hr />
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchasedCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary