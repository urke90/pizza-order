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
    return (
        <button
            className={`button ${secondary ? 'button--secondary' : ''} ${
                disabled ? 'button--disabled' : ''
            }`}
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{
                width
            }}
        >
            {children}
        </button>
    );
};

export default Button;
