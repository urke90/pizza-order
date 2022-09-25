import { useState, useCallback } from 'react';
import { useAppDispatch } from 'hooks/useRedux';
import { useModal } from 'hooks/useModal';
import {
    changeIngredientQuantity,
    removePizzaIngredient
} from 'redux/reducers/cartReducer';
import type { TIngredientActionType } from 'ts/ingredients';

import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import IngredientItem from 'components/ingredients/IngredientItem';
import IngredientConstValue from 'components/ingredients/IngredientConstValue';

import './CartIngredientItem.scss';

interface ICartIngredientItemProps {
    ingredient: {
        id: string;
        title: string;
        quantity: number;
    };
    pizzaId: string;
}

const CartIngredientItem: React.FC<ICartIngredientItemProps> = ({
    ingredient,
    pizzaId
}) => {
    const dispatch = useAppDispatch();
    const [show, handleToggleModal] = useModal();
    const [ingValueConstant, setIngValueConstant] = useState<number>(0.25);

    const { title, quantity } = ingredient;

    const handleIngredientConstValueChange = useCallback((value: number) => {
        setIngValueConstant(value);
    }, []);

    const handleIngredientQtyChange = useCallback(
        (id: string, value: number, type: TIngredientActionType) => {
            dispatch(
                changeIngredientQuantity({
                    pizzaId,
                    ingId: id,
                    value,
                    type
                })
            );
        },
        [dispatch, pizzaId]
    );

    const handleIngredientRemove = useCallback(
        (id: string) => {
            dispatch(removePizzaIngredient({ pizzaId, ingId: id }));
            handleToggleModal();
        },
        [pizzaId, dispatch, handleToggleModal]
    );

    return (
        <li className="cart-ingredient-item">
            <Modal
                show={show}
                headerTitle="Quantity:"
                onClose={handleToggleModal}
            >
                <div className="cart-ingredient-item__modal">
                    <IngredientConstValue
                        ingValueConstant={ingValueConstant}
                        onValueChange={handleIngredientConstValueChange}
                    />
                    <ul className="cart-ingredient-item__list">
                        <IngredientItem
                            ingredient={ingredient}
                            ingValueConstant={ingValueConstant}
                            onIngredientQtyChange={handleIngredientQtyChange}
                            onIngredientRemove={handleIngredientRemove}
                        />
                    </ul>
                </div>
            </Modal>
            <div className="cart-ingredient-item__description">
                <p className="cart-ingredient-item__title">{title}:</p>
                <p className="cart-ingredient-item__quantity">
                    {quantity.toFixed(2)}
                </p>
            </div>
            <div className="cart-ingredient-item__button--edit">
                <Button type="button" onClick={handleToggleModal}>
                    edit
                </Button>
            </div>
        </li>
    );
};
export default CartIngredientItem;
