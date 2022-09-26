import { useAppDispatch } from 'hooks/use-redux';
import { savePizzaId } from 'redux/reducers/pizza-reducer';

import './PizzaItem.scss';

interface IPizzaItemProps {
    imageUrl: string;
    recipeId: string;
    title: string;
}

const PizzaItem: React.FC<IPizzaItemProps> = ({
    recipeId,
    title,
    imageUrl
}) => {
    const dispatch = useAppDispatch();

    const handleGetPizzaId = () => dispatch(savePizzaId({ pizzaId: recipeId }));

    return (
        <li className="pizza__item" onClick={handleGetPizzaId}>
            <div className="pizza__img">
                <img src={imageUrl} alt={title} width={150} />
            </div>
            <div className="pizza__title">
                <h3>{title}</h3>
            </div>
        </li>
    );
};
export default PizzaItem;
