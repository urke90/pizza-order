import { useAppSelector } from 'hooks/use-redux';
import { getPizzasToRender } from 'util/pizzas-data';
import { isValidRecipeId } from 'util/className-generators';
import { IPizzas } from 'ts/pizzas';
import { paginationSelectors } from 'redux/reducers/pagination-reducer';

import PizzaItem from './PizzaItem';

import './PizzasList.scss';

interface IPizzaListProps {
    pizzas: IPizzas[];
    recipeId: string;
}

const PizzasList: React.FC<IPizzaListProps> = ({ recipeId, pizzas }) => {
    const currentPage = useAppSelector(paginationSelectors.currentPage);
    const itemsPerPage = useAppSelector(paginationSelectors.itemsPerPage);

    // slice fetched pizzas so we could should specific number of pizzas on UI
    const pizzasToRender = getPizzasToRender(pizzas, currentPage, itemsPerPage);

    return (
        <ul
            className={`main__pizzas-list ${isValidRecipeId(
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
    );
};

export default PizzasList;
