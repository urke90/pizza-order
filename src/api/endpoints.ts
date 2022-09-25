interface IAPI_Endpoints {
    [key: string]: string;
}

export const PIZZA_ENDPOINTS: IAPI_Endpoints = {
    pizzas: 'search?q=pizza',
    pizzaId: 'get?rId='
};
