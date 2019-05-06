import React from 'react';
import cssClasses from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = (props) => {
    const { price, ingredientAdded, ingredientRemove,
        purchasable, ordered, disabled, ingredients } = props;

    let controls = Object.keys(ingredients).map(igkey => {
        return ({ label: igkey, type: igkey });
    });
    return (
        <div className={cssClasses.BuildControls}>
            <p>Current Price: <strong>{price}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label.toUpperCase()}
                    added={() => ingredientAdded(ctrl.type)}
                    removed={() => ingredientRemove(ctrl.type)}
                    disabled={disabled[ctrl.type]} />))}
            <button className={cssClasses.OrderButton}
                disabled={!purchasable}
                onClick={ordered}>ORDER NOW!</button>
        </div>
    )
};
export default buildControls;