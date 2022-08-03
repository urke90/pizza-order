import { IPizzas } from 'ts/pizzas';

export const getPizzasToRender = (
    pizzas: IPizzas[],
    currentPage: number,
    itemsPerPage: number
): IPizzas[] => {
    const startSlice = (currentPage - 1) * itemsPerPage;
    const endSlice = (currentPage - 1) * itemsPerPage + itemsPerPage;
    return pizzas.slice(startSlice, endSlice);
};
