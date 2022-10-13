import { useEffect, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
    removePizzaRecipe,
    removePizzaId,
    pizzaSelectors
} from 'redux/reducers/pizza-reducer';
import { useIngredients } from 'hooks/use-ingredients';
import { useModal } from 'hooks/use-modal';
import { useAppDispatch, useAppSelector } from 'hooks/use-redux';
import { IUpdatableIngredients } from 'ts/ingredients';
import { ICartItem } from 'ts/orders-cart';
import { emptyCartItem, addPizzaToCart } from 'redux/reducers/cart-reducer';
import { convertIngredientsForRendering } from 'util/ingredients-data';
import { getPizzaById, getPizzas } from 'redux/actions/pizza-actions';
import { isValidRecipeId } from 'util/className-generators';

import Pagination from 'components/pagination/Pagination';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import PizzaAdd from 'components/pizza/PizzaAdd';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';

import './Main.scss';

const Main: React.FC = () => {
    const [show, handleToggleModal] = useModal();
    const [createdPizza, setCreatedPizza] = useState<ICartItem>(emptyCartItem);
    const {
        updatableIngredients,
        handleSetIngredients,
        handleIngredientQtyChange,
        handleIngredientRemove,
        handleChangePizzaQuantity,
        pizzaQuantity
    } = useIngredients();
    const dispatch = useAppDispatch();

    /**
     * pizzaSlice state
     */
    const fetchedPizzas = useAppSelector(pizzaSelectors.pizzas);
    const selectedPizzaId = useAppSelector(pizzaSelectors.pizzaId);
    const isLoading = useAppSelector(pizzaSelectors.isLoading);
    const error = useAppSelector(pizzaSelectors.error);
    const ingredients = useAppSelector(pizzaSelectors.ingredients);
    const title = useAppSelector(pizzaSelectors.title);
    const sourceUrl = useAppSelector(pizzaSelectors.sourceUrl);
    const imageUrl = useAppSelector(pizzaSelectors.imageUrl);
    const recipeId = useAppSelector(pizzaSelectors.recipeId);
    const pizzaPrice = useAppSelector(pizzaSelectors.price);
    const uid = useAppSelector((state) => state.authReducer.uid);

    /**
     * Handler functions
     * 1.handleAddToCart ===> will store modified pizza in state and open confirm order modal
     * 2. handleConfirmOrder ===> will store confirmed order in cart reducer
     */
    const handleAddToCart = useCallback(() => {
        const pizza: ICartItem = {
            pizzaId: uuid(),
            userId: uid,
            title,
            quantity: pizzaQuantity,
            imageUrl,
            sourceUrl,
            recipeId,
            ingredients: updatableIngredients,
            price: pizzaPrice
        };

        setCreatedPizza(pizza);
        handleToggleModal();
    }, [
        uid,
        title,
        imageUrl,
        sourceUrl,
        recipeId,
        pizzaQuantity,
        pizzaPrice,
        updatableIngredients,
        handleToggleModal
    ]);

    const handleConfirmOrder = useCallback(() => {
        dispatch(addPizzaToCart(createdPizza));
        dispatch(removePizzaId());
        dispatch(removePizzaRecipe());
        handleChangePizzaQuantity('reset');
        handleToggleModal();
    }, [createdPizza, dispatch, handleChangePizzaQuantity, handleToggleModal]);

    useEffect(() => {
        dispatch(getPizzas());
    }, [dispatch]);

    useEffect(() => {
        if (selectedPizzaId.trim() === '') return;
        dispatch(getPizzaById(selectedPizzaId));
    }, [dispatch, selectedPizzaId]);

    useEffect(() => {
        if (ingredients.length === 0) return;

        const convertedIngredients =
            convertIngredientsForRendering(ingredients);

        const updatableIngredients: IUpdatableIngredients =
            convertedIngredients.reduce((acc, nextIng) => {
                const { id, title, quantity } = nextIng;

                return {
                    ...acc,
                    [id]: {
                        id,
                        title,
                        quantity
                    }
                };
            }, {});

        handleSetIngredients(updatableIngredients);
    }, [ingredients, handleSetIngredients]);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && error) {
        return (
            <section className="main">
                <h1 className="main__heading">{error}</h1>
            </section>
        );
    } else if (!isLoading && !error && fetchedPizzas.length === 0) {
        return (
            <section className="main">
                <h1 className="main__heading">
                    Sorry, we don't have pizzas to offer at the moment.
                </h1>
            </section>
        );
    }

    return (
        <section className="main">
            <Modal
                show={show}
                headerTitle="Add pizza to your order"
                onClose={handleToggleModal}
                footer={
                    <Button type="button" onClick={handleConfirmOrder}>
                        confirm
                    </Button>
                }
            >
                <PizzaAdd createdPizza={createdPizza} />
            </Modal>
            <div className="main__container">
                <h1 className="main__heading">Pick your favorite pizza</h1>
                <div
                    className={`main__content ${isValidRecipeId(
                        recipeId,
                        'main__content--flex'
                    )}`}
                >
                    <div
                        style={{
                            width: recipeId === '' ? '100%' : ''
                        }}
                        className={`main__pizzas-list-wrapper ${isValidRecipeId(
                            recipeId,
                            'main__pizzas-list-wrapper--column'
                        )} `}
                    >
                        <PizzasList
                            pizzas={fetchedPizzas}
                            recipeId={recipeId}
                        />
                        <Pagination />
                    </div>
                    <main
                        className={`main__recipe ${isValidRecipeId(
                            recipeId,
                            'main__recipe--display-block'
                        )}`}
                    >
                        <PizzaRecipe
                            ingredients={ingredients}
                            title={title}
                            sourceUrl={sourceUrl}
                            imageUrl={imageUrl}
                            onAddToCart={handleAddToCart}
                            pizzaQuantity={pizzaQuantity}
                            pizzaPrice={pizzaPrice}
                            onChangePizzaQuantity={handleChangePizzaQuantity}
                        />
                    </main>
                    <div
                        className={`main__ingredients ${isValidRecipeId(
                            recipeId,
                            'main__ingredients--display-block'
                        )}`}
                    >
                        <Ingredients
                            ingredients={updatableIngredients}
                            onIngredientQtyChange={handleIngredientQtyChange}
                            onIngredientRemove={handleIngredientRemove}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
