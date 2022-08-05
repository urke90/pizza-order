import { useAppSelector } from 'hooks/useRedux';

import './PizzaRecipe.scss';

type PizzaRecipeProps = {};

const PizzaRecipe: React.FC<PizzaRecipeProps> = () => {
    const pizzaToRender = useAppSelector(
        (state) => state.pizzaReducer.selectedPizza
    );

    const { title, image_url, source_url } = pizzaToRender;

    console.log('pizzaToRender', pizzaToRender);

    return (
        <div className="recipe">
            <div className="recipe__heading">
                <h2>{title}</h2>
            </div>
            <div className="recipe__image">
                <img src={image_url} alt={title} />
            </div>
        </div>
    );
};
export default PizzaRecipe;
