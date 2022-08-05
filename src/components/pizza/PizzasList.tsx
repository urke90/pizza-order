import React from 'react';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { useAxios } from 'hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { API_ENDPOINTS } from 'api/endpoints';
import { saveFetchedPizzas } from 'redux/reducers/pizzaReducer';
import { getPizzasToRender } from 'util/pagination';

import PizzaItem from './PizzaItem';

const PizzasList: React.FC = () => {
    const { isLoading, error, sendRequest } = useAxios();
    const dispatch = useAppDispatch();

    // current page of pagination
    const currentPage = useAppSelector(
        (state) => state.paginationReducer.currentPage
    );

    // how many pizzas per page we will show in pagination
    const itemsPerPage = useAppSelector(
        (state) => state.paginationReducer.itemsPerPage
    );

    // all fetched pizzas from API which we will use to slice later
    const pizzas = useAppSelector((state) => state.pizzaReducer.pizzas);

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

    return (
        <ul
            className={`main__pizzas-list ${
                selectedPizza.recipe_id !== ''
                    ? 'main__pizzas-list--column'
                    : ''
            }`}
        >
            {!isLoading &&
                !error &&
                pizzasToRender.length > 0 &&
                pizzasToRender.map(({ recipe_id, title, image_url }) => (
                    <PizzaItem
                        key={recipe_id}
                        recipe_id={recipe_id}
                        title={title}
                        image_url={image_url}
                    />
                ))}
        </ul>
    );
};
export default PizzasList;
