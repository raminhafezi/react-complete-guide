import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.25,
    bacon: 0.75,
    bun: 0.5
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            bun: 0,
            cheese: 0,
            meat: 0

        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el; }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { return true }
        const updatedCount = oldCount - 1
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseCancelHandler = () => {
        console.log("purchasing", this.state.purchasing)
        this.setState({
            purchasing: false
        })
    }

    purchaseContinuedHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ramin',
                address: {
                    suburb: 'Wollstonecraft',
                    zip_code: '2065',
                    country: 'Australia'
                },
                Email: 'john.smith@email.com'
            }
        };
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        this.setState({ purchasing: true });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 };

        const { purchaseCancelHandler, purchaseContinuedHandler, addIngredientHandler,
            removeIngredientHandler, purchaseHandler } = this
        const { purchasing, ingredients, totalPrice, purchasable } = this.state;

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                    <OrderSummary ingredients={ingredients}
                        price={totalPrice.toFixed(2)}
                        purchasedCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinuedHandler} />
                </Modal >
                <Burger ingredients={ingredients} />
                <BuildControls ingredientAdded={addIngredientHandler}
                    ingredientRemove={removeIngredientHandler}
                    disabled={disabledInfo}
                    price={totalPrice.toFixed(2)}
                    purchasable={purchasable}
                    ordered={purchaseHandler} />
            </Aux >
        );
    };
}

export default BurgerBuilder;