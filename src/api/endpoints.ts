interface IAPI_Endpoints {
    [key: string]: string;
}

const DB_BASE_ENDPOINT =
    'https://pizza-order-6d2f9-default-rtdb.firebaseio.com/';

export const PIZZA_ENDPOINTS: IAPI_Endpoints = {
    pizzas: 'https://forkify-api.herokuapp.com/api/search?q=pizza',
    pizzaId: 'https://forkify-api.herokuapp.com/api/get?rId='
};

export const DB_ENDPOINTS = {
    users: DB_BASE_ENDPOINT + 'users',
    orders: DB_BASE_ENDPOINT + 'orders'
};
