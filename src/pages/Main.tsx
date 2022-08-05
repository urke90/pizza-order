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

    useEffect(() => {
        const fetchPizzaRecipe = async () => {
            const pizzaIdURL = API_ENDPOINTS.pizzaId;
            let response: AxiosResponse<any, any> | undefined;

            try {
                response = await sendRequest({
                    url: pizzaIdURL + selectedPizzaId,
                    method: 'GET'
                });

                console.log('response FETCHING SPECIFIC PIZZA', response);
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
                            ? 'main__content--inline'
                            : ''
                    }`}
                >
                    <div className="main__pizzas-list-wrapper">
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
                        <PizzaRecipe />
                    </main>
                    <div
                        className={`main__ingredients ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__ingredients--display-block'
                                : ''
                        }`}
                    >
                        ingredients here
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Main;
