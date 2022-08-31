interface INavLinksConfig {
    to: string;
    text: string;
}

export const NAVLINKS_CONFIG: INavLinksConfig[] = [
    {
        to: '/',
        text: 'main'
    },
    {
        to: '/orders',
        text: 'orders'
    },
    {
        to: '/custom-pizza',
        text: 'custom'
    },
    {
        to: '/cart',
        text: 'cart'
    }
];
