interface IAPI_Endpoints {
    [key: string]: string;
}

export const API_ENDPOINTS: IAPI_Endpoints = {
    pizzas: 'https://forkify-api.herokuapp.com/api/search?q=pizza',
    pizzaId: 'https://forkify-api.herokuapp.com/api/get?rId='
};
