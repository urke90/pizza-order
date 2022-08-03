import React from 'react';

import './PizzaItem.scss';

type PizzaItemProps = {};

const DUMMY_PIZZA = {
    image_url:
        'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
    publisher: '101 Cookbooks',
    publisher_url: 'http://www.101cookbooks.com',
    recipe_id: '47746',
    social_rank: 100,
    source_url: 'http://www.101cookbooks.com/archives/001199.html',
    title: 'Best Pizza Dough Ever'
};

const PizzaItem: React.FC<PizzaItemProps> = () => {
    return (
        <li className="pizza__item">
            <div className="pizza__img">
                <img src={DUMMY_PIZZA.image_url} alt="pizza" width={150} />
            </div>
            <div className="pizza__title">
                <h3>{DUMMY_PIZZA.title}</h3>
            </div>
        </li>
    );
};
export default PizzaItem;
