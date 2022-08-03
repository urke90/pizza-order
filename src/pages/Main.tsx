import React, { useEffect, useState } from 'react';
import { useAxios } from 'hooks/useAxios';
import { useAppDispatch } from 'hooks/useRedux';
import { API_ENDPOINTS } from 'api/endpoints';

import LoadingSpinner from 'shared/ui/LoadingSpinner';
import PizzaItem from 'components/main/PizzaItem';
import { saveFetchedPizzas } from 'redux/reducers/pizzaReducer';

import './Main.scss';

type MainProps = {};

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

const DUMMY_PIZZA_ARR = [
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    },
    {
        image_url:
            'http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg',
        publisher: '101 Cookbooks',
        publisher_url: 'http://www.101cookbooks.com',
        recipe_id: '47746',
        social_rank: 100,
        source_url: 'http://www.101cookbooks.com/archives/001199.html',
        title: 'Best Pizza Dough Ever'
    }
];

const Main: React.FC<MainProps> = () => {
    const { sendRequest, isLoading, error } = useAxios();
    // const [recId, setRecId] = useState();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchPizzas = async () => {
            const url = API_ENDPOINTS.pizzas;

            const response = await sendRequest({ url, method: 'GET' });
            // console.log('response', response);

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
                        <PizzaItem />
                        <PizzaItem />
                        <PizzaItem />
                        <PizzaItem />
                    </ul>

                    {/* <main className="main__recipe">present recepies</main>
                    <div className="main__ingredients">ingredients here</div> */}
                </div>
            </div>
        </section>
    );
};
export default Main;
