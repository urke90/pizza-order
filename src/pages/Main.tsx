import React, { useEffect, useCallback, useState } from 'react';
import { addPizzaToCart } from 'redux/reducers/ordersReducer';
import {
    savePizzaRecipe,
    removePizzaRecipe,
    removePizzaId
} from 'redux/reducers/pizzaReducer';

import { useAxios } from 'hooks/useAxios';
import { useIngredients } from 'hooks/useIngredients';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { API_ENDPOINTS } from 'api/endpoints';
import { IUpdatableIngredients } from 'ts/ingredients';
import { ICartItem } from 'ts/orders';
import { convertIngredientsForRendering } from 'util/ingredients-data';
import Pagination from 'components/pagination/Pagination';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import OrderList from 'components/orders/OrderList';
import Button from 'shared/form/Button';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';

import './Main.scss';
// import OrderConfirm from 'components/orders/OrderConfirm';

const Main: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [createdPizza, setCreatedPizza] = useState<ICartItem>({
        uid: '',
        title: '',
        recipeId: '',
        quantity: 0,
        imageUrl: '',
        sourceUrl: '',
        ingredients: {}
    });

    const { sendRequest, isLoading, error } = useAxios();
    const {
        updatableIngredients,
        handleSetIngredients,
        handleIngredientQtyChange,
        handleIngredientRemove,
        handleChangePizzaQuantity,
        pizzaQuantity
    } = useIngredients();
    const dispatch = useAppDispatch();

    // pizzaId we should fetch when user choose any
    const selectedPizzaId = useAppSelector(
        (state) => state.pizzaReducer.pizzaId
    );

    // fetched pizza with specific ID user has selected
    const selectedPizza = useAppSelector(
        (state) => state.pizzaReducer.selectedPizza
    );

    // user ID when user is logged in
    const uid = useAppSelector((state) => state.authReducer.uid);

    const cart = useAppSelector((state) => state.ordersReducer.cart);

    const { ingredients, title, source_url, image_url, recipe_id } =
        selectedPizza;

    const handleAddToCart = useCallback(() => {
        const pizza: ICartItem = {
            uid,
            title,
            quantity: pizzaQuantity,
            imageUrl: image_url,
            sourceUrl: source_url,
            recipeId: recipe_id,
            ingredients: updatableIngredients
        };

        setCreatedPizza(pizza);
        setShowModal(true);
    }, [
        uid,
        title,
        image_url,
        source_url,
        recipe_id,
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
        const fetchPizzaRecipe = async () => {
            const pizzaIdURL = API_ENDPOINTS.pizzaId;
            // let response: AxiosResponse<any, any> | undefined;

            try {
                const response = await sendRequest({
                    url: pizzaIdURL + selectedPizzaId,
                    method: 'GET'
                });

                if (response?.status !== 200) {
                    return;
                }

                const convertedIngredients = convertIngredientsForRendering(
                    response.data.recipe.ingredients
                );

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

                dispatch(
                    savePizzaRecipe({ selectedPizza: response.data.recipe })
                );
                handleSetIngredients(updatableIngredients);
            } catch (error) {
                console.log('error fetching specific pizza', error);
            }
        };

        if (selectedPizzaId) {
            fetchPizzaRecipe();
        }
    }, [selectedPizzaId, dispatch, sendRequest, handleSetIngredients]);

    useEffect(() => {
        console.log('selectedPizzaId', selectedPizzaId);
        console.log('selectedPizza', selectedPizza);
    }, [selectedPizzaId, selectedPizza]);

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
                    className={`main__content ${
                        selectedPizza.recipe_id !== ''
                            ? 'main__content--flex'
                            : ''
                    }`}
                >
                    <div
                        style={{
                            width: selectedPizza.recipe_id === '' ? '100%' : ''
                        }}
                        className={`main__pizzas-list-wrapper ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__pizzas-list-wrapper--column'
                                : ''
                        } `}
                    >
                        <PizzasList />
                        <Pagination />
                    </div>
                    <main
                        className={`main__recipe ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__recipe--display-block'
                                : ''
                        }`}
                    >
                        {selectedPizza && (
                            <PizzaRecipe
                                ingredients={ingredients}
                                title={title}
                                source_url={source_url}
                                image_url={image_url}
                                onAddToCart={handleAddToCart}
                                pizzaQuantity={pizzaQuantity}
                                onChangePizzaQuantity={
                                    handleChangePizzaQuantity
                                }
                            />
                        )}
                    </main>
                    <div
                        className={`main__ingredients ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__ingredients--display-block'
                                : ''
                        }`}
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
