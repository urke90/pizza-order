import Button from 'shared/form/Button';

import './IngredientConstValue.scss';

interface IIngredientConstValueProps {
    ingValueConstant: number;
    onValueChange: (value: number) => void;
}

const IngredientConstValue: React.FC<IIngredientConstValueProps> = ({
    ingValueConstant,
    onValueChange
}) => {
    return (
        <>
            <h4 className="ingredients-constant__heading">
                Increment or decrement by:
            </h4>
            <div className="ingredients-constant__buttons">
                <Button
                    type="button"
                    onClick={() => onValueChange(0.25)}
                    secondary={ingValueConstant === 0.25 ? true : false}
                >
                    0.25
                </Button>
                <span className="ingredients-constant__quantity">
                    {ingValueConstant}
                </span>
                <Button
                    type="button"
                    onClick={() => onValueChange(1)}
                    secondary={ingValueConstant === 1 ? true : false}
                >
                    1
                </Button>
            </div>
        </>
    );
};
export default IngredientConstValue;
