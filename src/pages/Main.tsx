import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAxios } from 'hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { saveFetchedPizzas } from 'redux/reducers/pizzaReducer';
import { API_ENDPOINTS } from 'api/endpoints';

import Pagination from 'components/pagination/Pagination';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzaItem from 'components/main/PizzaItem';
import { getPizzasToRender } from 'util/pagination';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
    const { sendRequest, isLoading, error } = useAxios();
    const dispatch = useAppDispatch();
    const pizzas = useAppSelector((state) => state.pizzaReducer.pizzas);
    const currentPage = useAppSelector(
        (state) => state.paginationReducer.currentPage
    );
    const itemsPerPage = useAppSelector(
        (state) => state.paginationReducer.itemsPerPage
    );

    const selectedPizzaId = useAppSelector(
        (state) => state.pizzaReducer.pizzaId
    );

    useEffect(() => {
        const fetchPizzaRecipe = async () => {
            console.log('USE EFFECT SELECTED PIZZA ID', selectedPizzaId);

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
        };

        if (selectedPizzaId) {
            fetchPizzaRecipe();
        }
    }, [selectedPizzaId]);

    const pizzasToRender = getPizzasToRender(pizzas, currentPage, itemsPerPage);

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

    return (
        <section className="main">
            {isLoading && !error && <LoadingSpinner asOverlay />}
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h1 className="main__heading">Main Pizza Page</h1>
                    <p>Pick your favorite pizza</p>
                </div>
                <div className="main__content">
                    <ul className="main__pizzas-list">
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
                    <main className="main__recipe">present recepies</main>
                    <div className="main__ingredients">ingredients here</div>
                </div>
            </div>
        </section>
    );
};
export default Main;
