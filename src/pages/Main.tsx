import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAxios } from 'hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import {
    saveFetchedPizzas,
    savePizzaRecipe
} from 'redux/reducers/pizzaReducer';
import { API_ENDPOINTS } from 'api/endpoints';

import Pagination from 'components/pagination/Pagination';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzaItem from 'components/pizza/PizzaItem';
import { getPizzasToRender } from 'util/pagination';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
    const { sendRequest, isLoading, error } = useAxios();
    const dispatch = useAppDispatch();

    // all fetched pizzas from API which we will use to slice later
    const pizzas = useAppSelector((state) => state.pizzaReducer.pizzas);

    // current page of pagination
    const currentPage = useAppSelector(
        (state) => state.paginationReducer.currentPage
    );

    // how many pizzas per page we will show in pagination
    const itemsPerPage = useAppSelector(
        (state) => state.paginationReducer.itemsPerPage
    );

    // pizzaId we should fetch when user choose any
    const selectedPizzaId = useAppSelector(
        (state) => state.pizzaReducer.pizzaId
    );

    // slice fetched pizzas so we could should specific number of pizzas on UI
    const pizzasToRender = getPizzasToRender(pizzas, currentPage, itemsPerPage);

    // fetched pizza with specific ID user has selected
    const selectedPizza = useAppSelector(
        (state) => state.pizzaReducer.selectedPizza
    );

    useEffect(() => {
        const fetchPizzas = async () => {
            const pizzasURL = API_ENDPOINTS.pizzas;
            let response: AxiosResponse<any, any> | undefined;

            try {
                response = await sendRequest({
                    url: pizzasURL,
                    method: 'GET'
                });
            } catch (error) {
                console.log('error fetching all pizzas', error);
            }

            if (response?.status !== 200) {
                return;
            }

            dispatch(saveFetchedPizzas({ pizzas: response.data.recipes }));
        };

        fetchPizzas();
    }, [sendRequest, dispatch]);

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
                        <ul
                            className={`main__pizzas-list ${
                                selectedPizza.recipe_id !== ''
                                    ? 'main__pizzas-list--column'
                                    : ''
                            }`}
                        >
                            {!isLoading &&
                                !error &&
                                pizzas.length > 0 &&
                                pizzasToRender.map(
                                    ({ recipe_id, title, image_url }) => (
                                        <PizzaItem
                                            key={recipe_id}
                                            recipe_id={recipe_id}
                                            title={title}
                                            image_url={image_url}
                                        />
                                    )
                                )}
                        </ul>
                        <Pagination itemsCount={pizzas.length} />
                    </div>
                    <main
                        className={`main__recipe ${
                            selectedPizza.recipe_id !== ''
                                ? 'main__recipe--display-block'
                                : ''
                        }`}
                    >
                        present recepies
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
