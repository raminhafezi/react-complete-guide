import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WrapperComponent from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 1.0,
    meat: 1.25,
    bacon: 0.75,
    bun: 0.5,
    egg: 1.75
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-39225.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
                // console.log(' [componentDidMount in BurerBuilder.js]: ', response.data)
            })
            .catch(err => { this.setState({ error: true }) })
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


        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.totalPrice)

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString

        })
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        const { purchaseCancelHandler, purchaseContinuedHandler, addIngredientHandler,
            removeIngredientHandler, purchaseHandler } = this
        const { purchasing, ingredients, totalPrice, purchasable } = this.state;

        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 };

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingrediants can not be loaded .... !</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredients={ingredients}
                        ingredientAdded={addIngredientHandler}
                        ingredientRemove={removeIngredientHandler}
                        disabled={disabledInfo}
                        price={totalPrice.toFixed(2)}
                        purchasable={purchasable}
                        ordered={purchaseHandler} />
                </Aux>);
            orderSummary = <OrderSummary ingredients={ingredients}
                price={totalPrice.toFixed(2)}
                purchasedCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinuedHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
                    {orderSummary}
                </Modal >
                {burger}
            </Aux >
        );
    };
}

export default WrapperComponent(BurgerBuilder, axios);