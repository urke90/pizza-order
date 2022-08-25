import { useState, useCallback } from 'react';

import { IUpdatableIngredients } from 'ts/ingredients';
import type { TIngredientActionType } from 'ts/ingredients';

interface IUseIngredients {
    updatableIngredients: IUpdatableIngredients;
    handleSetIngredients: (ingredients: IUpdatableIngredients) => void;
    handleIngredientQtyChange: (
        id: string,
        value: number,
        type: TIngredientActionType
    ) => void;
    handleIngredientRemove: (id: string) => void;
    pizzaQuantity: number;
    handleChangePizzaQuantity: (type: TIngredientActionType) => void;
}

export const useIngredients = (): IUseIngredients => {
    const [updatableIngredients, setUpdatableIngredients] =
        useState<IUpdatableIngredients>({});
    const [pizzaQuantity, setPizzaQuantity] = useState(1);

    const handleChangePizzaQuantity = useCallback(
        (type: TIngredientActionType) => {
            setPizzaQuantity((prevQuantity) => {
                return type === 'inc' ? prevQuantity + 1 : prevQuantity - 1;
            });
        },
        []
    );

    const handleSetIngredients = useCallback(
        (ingredients: IUpdatableIngredients) => {
            setUpdatableIngredients(ingredients);
        },
        []
    );

    const handleIngredientQtyChange = useCallback(
        (id: string, value: number, type: TIngredientActionType) => {
            if (id && type) {
                if (type === 'inc') {
                    return setUpdatableIngredients((prevIngredients) => {
                        if (prevIngredients[id] === undefined) {
                            return {
                                ...prevIngredients
                            };
                        }

                        return {
                            ...prevIngredients,
                            [id]: {
                                ...prevIngredients[id],
                                quantity: prevIngredients[id].quantity + value
                            }
                        };
                    });
                }

                return setUpdatableIngredients((prevIngredients) => {
                    if (prevIngredients[id] === undefined) {
                        return {
                            ...prevIngredients
                        };
                    }

                    return {
                        ...prevIngredients,
                        [id]: {
                            ...prevIngredients[id],
                            quantity: prevIngredients[id].quantity - value
                        }
                    };
                });
            }

            throw new Error(`ID: ${id} or type: ${type} is not provided`);
        },
        []
    );

    const handleIngredientRemove = useCallback((id: string) => {
        if (!id) {
            throw new Error(`Ingredient with ID ${id} is not found`);
        }

        setUpdatableIngredients((prevIngredients) => {
            if (prevIngredients[id] === undefined) {
                return {
                    ...prevIngredients
                };
            }

            delete prevIngredients[id];

            return {
                ...prevIngredients
            };
        });
    }, []);

    return {
        updatableIngredients,
        handleSetIngredients,
        handleIngredientQtyChange,
        handleIngredientRemove,
        handleChangePizzaQuantity,
        pizzaQuantity
    };
};
