import { generateGeneralClassName } from 'util/className-generators';
import './Button.scss';

interface IButtonProps {
    type: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    width?: number | string;
    secondary?: boolean;
}

const Button: React.FC<IButtonProps> = ({
    type,
    disabled,
    children,
    onClick,
    width,
    secondary
}) => {
    const buttonClassName = `button ${generateGeneralClassName(
        !!secondary,
        'button--secondary'
    )} ${generateGeneralClassName(!!disabled, 'button--disabled')}`;

    return (
        <div
            className={generateGeneralClassName(
                !!disabled,
                'cursor-not-allowed'
            )}
        >
            <button
                className={buttonClassName}
                type={type}
                disabled={disabled}
                onClick={onClick}
                style={{
                    width
                }}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;
