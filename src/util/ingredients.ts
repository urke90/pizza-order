// export const getIngredientLabel = (ingredient: string) =>
//     ingredient.split(' ').slice(1).join(' ');

// used to count ingredinet quantity if it's in format 1-1/4, 1-1/3 etc
export const getIngredientQuantity = (ingQty: string): number => {
    // console.log('ingQty', ingQty);

    const splitIngQty = ingQty.split('-');
    const ingQtyWholeNum = parseInt(splitIngQty[0]);
    // console.log('ingQtyWhole', ingQtyWhole);

    const ingQtyFraction = splitIngQty[1];
    // const ingQtyFractionSplit = ingQtyFraction.split('/');
    // const countedFraction =
    //     parseInt(ingQtyFractionSplit[0]) / parseInt(ingQtyFractionSplit[1]);
    const countedFraction = countFractionQuantity(ingQtyFraction);

    // console.log(
    //     'countedFraction AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    //     countedFraction
    // );

    const totalQuantity = ingQtyWholeNum + countedFraction;
    // console.log('totalQuantity', totalQuantity);
    return totalQuantity;
};

// used to count fraction numbers like 1/4, 1/3 etc
export const countFractionQuantity = (ingQtyFraction: string): number => {
    // console.log('ingQtyFraction', ingQtyFraction);

    const ingQtyFractionSplit = ingQtyFraction.split('/');
    // console.log('ingQtyFractionSplit', ingQtyFractionSplit);

    const firstNum = parseInt(ingQtyFractionSplit[0]);
    // console.log('firstNum', firstNum);

    const secondNum = parseInt(ingQtyFractionSplit[1]);
    // console.log('secondNum', secondNum);

    // console.log('firstNum / secondNum', firstNum / secondNum);

    return firstNum / secondNum;
};
