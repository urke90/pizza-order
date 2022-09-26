import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/use-redux';
import { getPizzasToRender } from 'util/pagination-data';
import { fetchPizzas } from 'redux/actions/pizza-actions';
import { generateRecipeClassName } from 'util/className-generators';
import { pizzaSelectors } from 'redux/reducers/pizza-reducer';
import { paginationSelectors } from 'redux/reducers/pagination-reducer';
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

    return (
        <>
            <ul
                className={`main__pizzas-list ${generateRecipeClassName(
                    recipeId,
                    'main__pizzas-list--column'
                )}`}
            >
                {pizzasToRender.length > 0 &&
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
