import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { getPizzasToRender } from 'util/pagination-data';
import { getPizzas } from 'redux/actions/pizza-actions';

import './PizzasList.scss';

import PizzaItem from './PizzaItem';

const PizzasList: React.FC = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.pizzaReducer.isLoading);
    const error = useAppSelector((state) => state.pizzaReducer.error);

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
        dispatch(getPizzas());
    }, [dispatch]);

    // TODO FIGURE OUT A BEST WAY TO SHOW FALLBACK CONTENT IN REACT

    // const fallbackContent = (
    //     <h2 style={{ textAlign: 'center' }}>
    //         Sorry there are no pizzas we can offer at the moment :(
    //     </h2>
    // );

    return (
        <>
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
        </>
    );
};
export default PizzasList;
