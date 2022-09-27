import { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { generateRecipeClassName } from 'util/className-generators';
import { isPizzaFetchedSuccessfully } from 'util/check-statments';

import Pagination from 'components/pagination/Pagination';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import PizzaAddList from 'components/pizza/PizzaAddList';
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
            ingredients: updatableIngredients
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

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && fetchedPizzas.length === 0 && !error) {
        return (
            <section className="main">
                <div className="main__container">
                    <div className="main__heading-wrapper">
                        <h1 className="main__heading">
                            There are no pizzas to offer at the moment.
                        </h1>
                    </div>
                </div>
            </section>
        );
    } else if (
        isPizzaFetchedSuccessfully(
            isLoading,
            recipeId,
            ingredients,
            imageUrl,
            sourceUrl,
            title,
            error
        )
    ) {
        return (
            <section className="main">
                <div className="main__container">
                    <div className="main__heading-wrapper">
                        <h1
                            className="main__heading"
                            style={{ marginBottom: '20px' }}
                        >
                            Something went wrong! We can't show details for
                            choosen pizza.
                        </h1>
                        <Link to="/main">
                            <Button type="button">Choose again</Button>
                        </Link>
                    </div>
                </div>
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
                <PizzaAddList createdPizza={createdPizza} />
            </Modal>
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h1 className="main__heading">Pick your favorite pizza</h1>
                </div>
                <div
                    className={`main__content ${generateRecipeClassName(
                        recipeId,
                        'main__content--flex'
                    )}`}
                >
                    <div
                        style={{
                            width: recipeId === '' ? '100%' : ''
                        }}
                        className={`main__pizzas-list-wrapper ${generateRecipeClassName(
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
                        className={`main__recipe ${generateRecipeClassName(
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
                            onChangePizzaQuantity={handleChangePizzaQuantity}
                        />
                    </main>
                    <div
                        className={`main__ingredients ${generateRecipeClassName(
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
