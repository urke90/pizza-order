import React, { useEffect, useState } from 'react';
import { useAxios } from 'hooks/useAxios';

import { API_ENDPOINTS } from 'api/endpoints';

import './Main.scss';

type MainProps = {};

const Main: React.FC<MainProps> = () => {
    const { sendRequest } = useAxios();
    const [recId, setRecId] = useState();

    useEffect(() => {
        const fetchPizzas = async () => {
            const url = API_ENDPOINTS.pizza;

            const response = await sendRequest({ url, method: 'GET' });
            setRecId(response?.data.recipes);
            console.log('response', response);
        };

        fetchPizzas();
    }, []);

    useEffect(() => {
        const fetchPizzas = async () => {
            const url = API_ENDPOINTS.pizza;

            const response = await sendRequest({
                url: 'https://forkify-api.herokuapp.com/api/get?rId=35477',
                method: 'GET'
            });
            console.log('response RECIPE', response);
        };

        fetchPizzas();
    }, []);

    return (
        <section className="main">
            <div className="main__container">
                <div className="main__heading-wrapper">
                    <h2 className="main__heading">Main Pizza Page</h2>
                    <p>Pick your favorite pizza</p>
                </div>
                <div className="main__content">
                    <aside className="main__menu">menu here</aside>
                    <main>present recepies</main>
                    <aside className="main__ingredients">
                        ingredients here
                    </aside>
                </div>
            </div>
        </section>
    );
};
export default Main;
