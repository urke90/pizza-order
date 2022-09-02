import { useState, useCallback, useEffect } from 'react';

import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import IngredientItem from 'components/ingredients/IngredientItem';
import IngredientConstValue from 'components/ingredients/IngredientConstValue';

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
    const { id, title, quantity } = ingredient;

    const [showModal, setShowModal] = useState(false);
    const [ingValueConstant, setIngValueConstant] = useState<number>(0.25);

    useEffect(() => {
        console.log('ingValueConstant', ingValueConstant);
    }, [ingValueConstant]);

    const handleIngredientConstValueChange = useCallback(
        (value: number) => setIngValueConstant(value),
        []
    );

    const handleIngredientQtyChange = useCallback(
        (id: string, value: number, type: TIngredientActionType) => {
            console.log('handleIngredientQtyChange', id, value, type);
        },
        []
    );

    const handleIngredientRemove = useCallback((id: string) => {
        console.log('handleIngredientRemove', id);
    }, []);

    console.log('ingredient inCartIngredientItem'.toUpperCase(), ingredient);

    return (
        <li className="cart-ingredient-item">
            {showModal && (
                <Modal
                    headerTitle="Quantity:"
                    onClose={() => setShowModal(false)}
                >
                    <div className="cart-ingredient-item__modal">
                        <IngredientConstValue
                            ingValueConstant={ingValueConstant}
                            onValueChange={handleIngredientConstValueChange}
                        />
                        <ul className="cart-ingredient-item__list">
                            <IngredientItem
                                ingredient={ingredient}
                                ingValueConstant={0.25}
                                onIngredientQtyChange={
                                    handleIngredientQtyChange
                                }
                                onIngredientRemove={handleIngredientRemove}
                            />
                        </ul>
                    </div>
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
