import { useState } from 'react';
import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import IngredientItem from 'components/ingredients/IngredientItem';
import type { TIngredientActionType } from 'ts/ingredients';

import './CartIngredientItem.scss';

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
    const [showModal, setShowModal] = useState(false);

    const { id, title, quantity } = ingredient;
    const handleIngredientQtyChange = (
        id: string,
        value: number,
        type: TIngredientActionType
    ) => {
        console.log('handleIngredientQtyChange', id, value, type);
    };

    const handleIngredientRemove = (id: string) => {
        console.log('handleIngredientRemove', id);
    };

    console.log('ingredient inCartIngredientItem'.toUpperCase(), ingredient);

    return (
        <li className="cart-ingredient-item">
            {showModal && (
                <Modal
                    headerTitle="Quantity:"
                    onClose={() => setShowModal(false)}
                >
                    <ul className="cart-ingredient-item__list">
                        <IngredientItem
                            ingredient={ingredient}
                            ingValueConstant={0.25}
                            onIngredientQtyChange={handleIngredientQtyChange}
                            onIngredientRemove={handleIngredientRemove}
                        />
                    </ul>
                </Modal>
            )}
            <div className="cart-ingredient-item__description">
                <p className="cart-ingredient-item__title">{title}:</p>
                <p className="cart-ingredient-item__quantity">
                    {quantity.toFixed(2)}
                </p>
            </div>
            <div className="cart-ingredient__button--edit">
                <Button type="button" onClick={() => setShowModal(true)}>
                    edit
                </Button>
            </div>
        </li>
    );
};
export default CartIngredientItem;
