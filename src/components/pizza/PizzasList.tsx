import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { getPizzasToRender } from 'util/pagination-data';
import { fetchPizzas } from 'redux/actions/pizzaActions';
import { generateClassName } from 'util/class-generators/main-page';
import { pizzaSelectors } from 'redux/reducers/pizzaReducer';
import { paginationSelectors } from 'redux/reducers/paginationReducer';
import PizzaItem from './PizzaItem';

import './PizzasList.scss';

const PizzasList: React.FC<{ recipeId: string }> = ({ recipeId }) => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector(pizzaSelectors.isLoading);
    const error = useAppSelector(pizzaSelectors.error);
    const pizzas = useAppSelector(pizzaSelectors.pizzas);

    const currentPage = useAppSelector(paginationSelectors.currentPage);

    const itemsPerPage = useAppSelector(paginationSelectors.itemsPerPage);

    // slice fetched pizzas so we could should specific number of pizzas on UI
    const pizzasToRender = getPizzasToRender(pizzas, currentPage, itemsPerPage);

    useEffect(() => {
        if (pizzas.length > 0) {
            return;
        }

        dispatch(fetchPizzas());
    }, [dispatch, pizzas]);

    // TODO FIGURE OUT A BEST WAY TO SHOW FALLBACK CONTENT IN REACT

    // const fallbackContent = (
    //     <h2 style={{ textAlign: 'center' }}>
    //         Sorry there are no pizzas we can offer at the moment :(
    //     </h2>
    // );

    return (
        <>
            <ul
                className={`main__pizzas-list ${generateClassName(
                    recipeId,
                    'main__pizzas-list--column'
                )}`}
            >
                {!isLoading &&
                    !error &&
                    pizzasToRender.length > 0 &&
                    pizzasToRender.map(({ recipe_id, title, image_url }) => (
                        <PizzaItem
                            key={recipe_id}
                            recipeId={recipe_id}
                            title={title}
                            imageUrl={image_url}
                        />
                    ))}
            </ul>
        </>
    );
};
export default PizzasList;
