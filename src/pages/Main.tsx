import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAxios } from 'hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { savePizzaRecipe } from 'redux/reducers/pizzaReducer';
import { API_ENDPOINTS } from 'api/endpoints';

import Pagination from 'components/pagination/Pagination';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzasList from 'components/pizza/PizzasList';
import PizzaRecipe from 'components/recipe/PizzaRecipe';
import Ingredients from 'components/ingredients/Ingredients';
import {
    getIngredientQuantity,
    countFractionQuantity,
    ingredientIncludesDash,
    ingredientIncludesSlash,
    ingredientIsNumber,
    ingredientIsFraction
} from 'util/ingredients';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
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

    const { ingredients, title, source_url, image_url } = selectedPizza;

    console.log('ingredients in MAIN ******', ingredients);

    let convertedIngredients = ingredients.map((ing) => {
        // console.log('ing ****', ing);

        const splitIng = ing.split(' ');
        // console.log('splitIng', splitIng);

        const ingSplitFirstPart = splitIng[0];
        const ingSplitSecondPart = splitIng[1];
        // console.log('ingSplitSecondPart', ingSplitSecondPart);

        // const ingredientsLabel = splitIng.slice(1).join(' ');
        let ingredientQuantity: number = 1;

        // let bla = getIngredientLabel(ing);
        // console.log('bla', bla);

        if (ingredientIncludesDash(ingSplitFirstPart)) {
            // code to execute if ing first part is 1-1/4
            // console.log('1');

            // console.log('ingSplitFirstPart', ingSplitFirstPart);

            // const splitIngQty = ingQty.split('-');
            // const ingQtyWholeNum = parseInt(splitIngQty[0]);
            // console.log('ingQtyWhole', ingQtyWhole);

            // const ingQtyFraction = splitIngQty[1];
            // const ingQtyFractionSplit = ingQtyFraction.split('/');
            // const countedFraction =
            //     parseInt(ingQtyFractionSplit[0]) /
            //     parseInt(ingQtyFractionSplit[1]);
            // const totalQuantity = ingQtyWholeNum + countedFraction;
            // console.log('totalQuantity', totalQuantity);
            ingredientQuantity = getIngredientQuantity(ingSplitFirstPart);
            // console.log('ingredientQuantity', ingredientQuantity);
        } else if (ingredientIncludesSlash(ingSplitFirstPart)) {
            // console.log('2');
            // code to execute if ing first part is exm: 1/4
            ingredientQuantity = countFractionQuantity(ingSplitFirstPart);
            // console.log('fractionSplit');
        }

        if (ingredientIsNumber(ingSplitFirstPart)) {
            // console.log('3 AAAAAAAAAAAAAAAAAAAAAAAAAAAAA', ingSplitFirstPart);

            // console.log(
            //     '3 BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            //     Number(ingSplitFirstPart)
            // );
            ingredientQuantity = Number(ingSplitFirstPart);
        }

        if (ingredientIsFraction(ingSplitSecondPart)) {
            // console.log('4');

            const countedFraction = countFractionQuantity(ingSplitSecondPart);
            ingredientQuantity += countedFraction;
        }

        console.log('ingredientQuantity', ingredientQuantity);
        // console.log('ingredientQuantity', ingredientQuantity);
    });

    useEffect(() => {
        const fetchPizzaRecipe = async () => {
            const pizzaIdURL = API_ENDPOINTS.pizzaId;
            let response: AxiosResponse<any, any> | undefined;

            try {
                response = await sendRequest({
                    url: pizzaIdURL + selectedPizzaId,
                    method: 'GET'
                });

                // console.log('response FETCHING SPECIFIC PIZZA', response);
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
    }, [selectedPizzaId, sendRequest, dispatch]);

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
                        <PizzaRecipe
                            ingredients={ingredients}
                            title={title}
                            source_url={source_url}
                            image_url={image_url}
                        />
                    </main>
                    <div
                        className={`main__ingredients ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__ingredients--display-block'
                                : ''
                        }`}
                    >
                        {/* <Ingredients ingredients={ingredients} /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Main;
