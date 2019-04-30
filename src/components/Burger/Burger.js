import React from 'react';
import cssClasses from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    // console.log("Object.keys(props.ingredients)", Object.keys(props.ingredients))
    // console.log("Array(props.ingredients[igKey])", Object.keys(props.ingredients).map(igKey => {return [...Array(props.ingredients[igKey])]}))
    // console.log("FINALLY==========>)", Object.keys(props.ingredients).map(igKey => {return [...Array(props.ingredients[igKey])].map((_, i)=> 
    //     {return <BurgerIngredient key={igKey + i} type={igKey} />;}); }))

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        }).reduce((prevValue, CurrentValue) => { return CurrentValue.concat(prevValue) }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>add <strong>ingredients</strong> to Burger</p>
        // console.log(transformedIngredients)
    }

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};


export default burger;