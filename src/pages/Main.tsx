import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useAxios } from 'hooks/useAxios';
import { useIngredients } from 'hooks/useIngredients';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { savePizzaRecipe } from 'redux/reducers/pizzaReducer';
import { API_ENDPOINTS } from 'api/endpoints';
import { IUpdatableIngredients } from 'ts/ingredients';
import Pagination from 'components/pagination/Pagination';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import { convertIngredientsForRendering } from 'util/ingredients-data';

import './Main.scss';

const Main: React.FC = () => {
    const {
        updatableIngredients,
        handleSetIngredients,
        handleIngredientQtyChange,
        handleIngredientRemove
    } = useIngredients();
    const { sendRequest, isLoading, error } = useAxios();
    const dispatch = useAppDispatch();

    // pizzaId we should fetch when user choose any
    const selectedPizzaId = useAppSelector(
        (state) => state.pizzaReducer.pizzaId
    );

    // fetched pizza with specific ID user has selected
    const selectedPizza = useAppSelector(
        (state) => state.pizzaReducer.selectedPizza
    );

    // const onIngredientQtyChange =
    //     (value: number) => (id: string, type: TIngredientActionType) => {
    //         if (id && type) {
    //             if (type === 'inc') {
    //                 return setUpdatableIngredients((prevIngredients) => {
    //                     if (prevIngredients[id] === undefined) {
    //                         return {
    //                             ...prevIngredients
    //                         };
    //                     }

    //                     return {
    //                         ...prevIngredients,
    //                         [id]: {
    //                             ...prevIngredients[id],
    //                             quantity: prevIngredients[id].quantity + value
    //                         }
    //                     };
    //                 });
    //             }

    //             return setUpdatableIngredients((prevIngredients) => {
    //                 if (prevIngredients[id] === undefined) {
    //                     return {
    //                         ...prevIngredients
    //                     };
    //                 }

    //                 return {
    //                     ...prevIngredients,
    //                     [id]: {
    //                         ...prevIngredients[id],
    //                         quantity: prevIngredients[id].quantity - value
    //                     }
    //                 };
    //             });
    //         }

    //         throw new Error(`ID: ${id} or type: ${type} is not provided`);
    //     };

    // const onIngredientRemove = (id: string) => {
    //     if (!id) {
    //         throw new Error(`Ingredient with ID ${id} is not found`);
    //     }

    //     setUpdatableIngredients((prevIngredients) => {
    //         if (prevIngredients[id] === undefined) {
    //             return {
    //                 ...prevIngredients
    //             };
    //         }

    //         delete prevIngredients[id];

    //         return {
    //             ...prevIngredients
    //         };
    //     });
    // };

    // useEffect(() => {
    //     console.log(
    //         'updatableIngredients u USE EFFET U MAIN.TSX AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    //         updatableIngredients
    //     );

    //     console.log('BLBLBLBLBLBLBLBLBBLBLBLBLBLBLBLBLBLBLBL', bla);

    //     console.log('COMPAREEEEEEEEE', bla === updatableIngredients);
    // }, [updatableIngredients]);

    const { ingredients, title, source_url, image_url } = selectedPizza;

    const handleAddToCart = () => {
        /**
         * DATA TO SEND
         * 1. recipe_id --- bice KEY za objekat koji cu da napravim
         * 2. title --- title od pizze
         * 3. ingredients
         */

        // const orderedPizza = {
        //     title,
        //     ingredients
        // };

        console.log('handleAddToCart');
    };

    useEffect(() => {
        const fetchPizzaRecipe = async () => {
            const pizzaIdURL = API_ENDPOINTS.pizzaId;
            let response: AxiosResponse<any, any> | undefined;

            try {
                response = await sendRequest({
                    url: pizzaIdURL + selectedPizzaId,
                    method: 'GET'
                });

                const convertedIngredients = convertIngredientsForRendering(
                    response?.data.recipe.ingredients
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

                handleSetIngredients(updatableIngredients);
            } catch (error) {
                console.log('error fetching specific pizza', error);
            }

            if (response?.status !== 200) {
                return;
            }

            dispatch(savePizzaRecipe({ selectedPizza: response.data.recipe }));
        };

        if (selectedPizzaId) {
            fetchPizzaRecipe();
        }
    }, [selectedPizzaId, dispatch, sendRequest, handleSetIngredients]);

    return (
        <section className="main">
            {isLoading && !error && <LoadingSpinner asOverlay />}
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h1 className="main__heading">Main Pizza Page</h1>
                    <p>Pick your favorite pizza</p>
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
