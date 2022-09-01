import './CartIngredientItem.scss';

import Button from 'shared/form/Button';

import React from 'react';

interface ICartIngredientItemProps {
    ingredient: {
        id: string;
        title: string;
        quantity: number;
    };
}

const CartIngredientItem: React.FC<ICartIngredientItemProps> = ({
    ingredient
}) => {
    const { id, title, quantity } = ingredient;

    console.log('ingredient inCartIngredientItem'.toUpperCase(), ingredient);

    return (
        <li className="cart-ingredient-item">
            <div className="cart-ingredient-item__description">
                <p className="cart-ingredient-item__title">{title}:</p>
                <p className="cart-ingredient-item__quantity">
                    {quantity.toFixed(2)}
                </p>
            </div>
            <div className="cart-ingredient__button--edit">
                <Button type="button" onClick={() => {}}>
                    edit
                </Button>
            </div>
        </li>
    );
};
export default CartIngredientItem;
