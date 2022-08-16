// export const getIngredientLabel = (ingredient: string) =>
//     ingredient.split(' ').slice(1).join(' ');

export const getIngredientQuantity = (ingQty: string) => {
    // console.log('ingQty', ingQty);

    const splitIngQty = ingQty.split('-');
    const ingQtyWholeNum = parseInt(splitIngQty[0]);
    // console.log('ingQtyWhole', ingQtyWhole);

    const ingQtyFraction = splitIngQty[1];
    const ingQtyFractionSplit = ingQtyFraction.split('/');
    const countedFraction =
        parseInt(ingQtyFractionSplit[0]) / parseInt(ingQtyFractionSplit[1]);
    const totalQuantity = ingQtyWholeNum + countedFraction;
    // console.log('totalQuantity', totalQuantity);
    return totalQuantity;
};
