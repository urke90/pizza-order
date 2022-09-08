import React, { useEffect, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { addPizzaToCart } from 'redux/reducers/cartReducer';
import { removePizzaRecipe, removePizzaId } from 'redux/reducers/pizzaReducer';
import { pizzaSelectors } from 'redux/reducers/pizzaReducer';
import { useIngredients } from 'hooks/useIngredients';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { IUpdatableIngredients } from 'ts/ingredients';
import { ICartItem } from 'ts/orders';
import { emptyCartItem } from 'redux/reducers/cartReducer';
import { convertIngredientsForRendering } from 'util/ingredients-data';
import { fetchPizzaById } from 'redux/actions/pizza-actions';
import { generateClassName } from 'util/class-generators/main-page';

import Pagination from 'components/pagination/Pagination';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import OrderList from 'components/orders/OrderList';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';

import './Main.scss';

const Main: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
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

    // TODO figure out best way to shorten these selectors
    // ? IS THIS RIGHT APROACH?!??!?!??!?!??!??!
    /**
     * pizzaSlice state
     */
    const selectedPizzaId = useAppSelector(pizzaSelectors.pizzaId);
    const isLoading = useAppSelector(pizzaSelectors.isLoading);
    const error = useAppSelector(pizzaSelectors.error);
    const selectedPizza = useAppSelector(pizzaSelectors.selectedPizza);
    const ingredients = useAppSelector(pizzaSelectors.ingredients);
    const title = useAppSelector(pizzaSelectors.title);
    const sourceUrl = useAppSelector(pizzaSelectors.sourceUrl);
    const imageUrl = useAppSelector(pizzaSelectors.imageUrl);
    const recipeId = useAppSelector(pizzaSelectors.recipeId);
    const uid = useAppSelector((state) => state.authReducer.uid);

    /**
     * Handler functions
     */
    const handleAddToCart = useCallback(() => {
        const pizza: ICartItem = {
            pizzaId: uuid(),
            uid,
            title,
            quantity: pizzaQuantity,
            imageUrl,
            sourceUrl,
            recipeId,
            ingredients: updatableIngredients
        };

        setCreatedPizza(pizza);
        setShowModal(true);
    }, [
        uid,
        title,
        imageUrl,
        sourceUrl,
        recipeId,
        pizzaQuantity,
        updatableIngredients
    ]);
    // will add pizza to cart after modal is opened and order is confirmed
    const handleConfirmOrder = useCallback(() => {
        dispatch(addPizzaToCart({ pizza: createdPizza }));
        dispatch(removePizzaId());
        dispatch(removePizzaRecipe());
        setShowModal(false);
    }, [createdPizza, dispatch]);

    useEffect(() => {
        if (selectedPizzaId.trim() === '') return;
        dispatch(fetchPizzaById(selectedPizzaId));
    }, [dispatch, selectedPizzaId]);

    useEffect(() => {
        if (ingredients.length === 0) return;

        const convertedIngredients =
            convertIngredientsForRendering(ingredients);

        let updatableIngredients: IUpdatableIngredients = {};

        convertedIngredients.forEach(({ id, title, quantity }) => {
            updatableIngredients = {
                ...updatableIngredients,
                [id]: {
                    id,
                    title,
                    quantity
                }
            };
        });

        handleSetIngredients(updatableIngredients);
    }, [ingredients, handleSetIngredients]);

    return (
        <section className="main">
            {showModal && (
                <Modal
                    headerTitle="Add pizza to your order"
                    onClose={() => setShowModal(false)}
                    footer={
                        <Button type="button" onClick={handleConfirmOrder}>
                            confirm
                        </Button>
                    }
                >
                    <OrderList createdPizza={createdPizza} />
                </Modal>
            )}
            {isLoading && !error && <LoadingSpinner asOverlay />}
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h1 className="main__heading">Pick your favorite pizza</h1>
                </div>
                <div
                    className={`main__content ${generateClassName(
                        recipeId,
                        'main__content--flex'
                    )}`}
                >
                    <div
                        style={{
                            width: recipeId === '' ? '100%' : ''
                        }}
                        className={`main__pizzas-list-wrapper ${generateClassName(
                            recipeId,
                            'main__pizzas-list-wrapper--column'
                        )} `}
                    >
                        <PizzasList recipeId={recipeId} />
                        <Pagination />
                    </div>
                    <main
                        className={`main__recipe ${generateClassName(
                            recipeId,
                            'main__recipe--display-block'
                        )}`}
                    >
                        {selectedPizza && (
                            <PizzaRecipe
                                ingredients={ingredients}
                                title={title}
                                sourceUrl={sourceUrl}
                                imageUrl={imageUrl}
                                onAddToCart={handleAddToCart}
                                pizzaQuantity={pizzaQuantity}
                                onChangePizzaQuantity={
                                    handleChangePizzaQuantity
                                }
                            />
                        )}
                    </main>
                    <div
                        className={`main__ingredients ${generateClassName(
                            recipeId,
                            'main__ingredients--display-block'
                        )}`}
                    >
                        {updatableIngredients && (
                            <Ingredients
                                onIngredientQtyChange={
                                    handleIngredientQtyChange
                                }
                                onIngredientRemove={handleIngredientRemove}
                                ingredients={updatableIngredients}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
