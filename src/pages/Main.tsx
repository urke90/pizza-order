import React, { useEffect, useState } from 'react';
import { useAxios } from 'hooks/useAxios';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { saveFetchedPizzas } from 'redux/reducers/pizzaReducer';
import { API_ENDPOINTS } from 'api/endpoints';

import Pagination from 'components/pagination/Pagination';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzaItem from 'components/main/PizzaItem';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
    const { sendRequest, isLoading, error } = useAxios();
    const dispatch = useAppDispatch();
    const pizzas = useAppSelector((state) => state.pizzaReducer.pizzas);
    const bla = useAppSelector((state) => {
        console.log(
            'currentPage FROM PAGINATION REDUCER',
            state.paginationReducer.currentPage
        );
    });

    const selectPizzaRecipe = (pizzaId: string) => {
        console.log('pizzaID', pizzaId);
    };

    const handlePizzaPageChange = () => {};

    const currentPage = 1;
    const totalItems = 4;
    const startSlice = (currentPage - 1) * totalItems;
    const endSlice = (currentPage - 1) * totalItems + totalItems;

    const slicedPizzas = pizzas.slice(startSlice, endSlice);

    // console.log('slicedPizzas', slicedPizzas);

    useEffect(() => {
        const fetchPizzas = async () => {
            const url = API_ENDPOINTS.pizzas;

            const response = await sendRequest({ url, method: 'GET' });
            // console.log('response', response!.data.recipes);

            if (response?.status !== 200) {
                return;
            }

            dispatch(saveFetchedPizzas({ pizzas: response.data.recipes }));
        };

        fetchPizzas();
    }, []);

    // useEffect(() => {
    //     const fetchPizzas = async () => {
    //         const url = API_ENDPOINTS.pizza;

    //         const response = await sendRequest({
    //             url: 'https://forkify-api.herokuapp.com/api/get?rId=35477',
    //             method: 'GET'
    //         });
    //         console.log('response RECIPE', response);
    //     };

    //     fetchPizzas();
    // }, []);

    return (
        <section className="main">
            {isLoading && !error && <LoadingSpinner asOverlay />}
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h2 className="main__heading">Main Pizza Page</h2>
                    <p>Pick your favorite pizza</p>
                </div>
                <div className="main__content">
                    <ul className="main__pizzas-list">
                        {!isLoading &&
                            !error &&
                            pizzas.length &&
                            slicedPizzas.map(
                                ({ recipe_id, title, image_url }) => (
                                    <PizzaItem
                                        key={recipe_id}
                                        recipe_id={recipe_id}
                                        title={title}
                                        image_url={image_url}
                                        onGetRecipeId={selectPizzaRecipe}
                                    />
                                )
                            )}
                    </ul>
                    <Pagination
                        onArrowPageChange={handlePizzaPageChange}
                        itemsCount={pizzas.length}
                    />
                    {/* <main className="main__recipe">present recepies</main>
                    <div className="main__ingredients">ingredients here</div> */}
                </div>
            </div>
        </section>
    );
};
export default Main;
