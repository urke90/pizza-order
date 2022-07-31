import './Button.scss';

interface IButtonProps {
    type: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    width?: number | string;
    // bgColor?: 'red' | 'dark' | 'green' | 'yellow' | 'orange'; // TODO delete this one probably
    secondary?: boolean;
}

// TODO see what i am going to do with this
const BUTTON_COLOR = {
    red: '#d61c4e',
    dark: '#293462',
    orange: ' #feb139',
    yellow: '#fff80a',
    green: '#3ccf4e',
    white: '#ffffff'
};

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
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{
                backgroundColor: secondary ? '#feb139' : '',
                borderColor: secondary ? '#feb139' : '',
                color: secondary ? '#001e28' : '',
                width
            }}
        >
            {children}
        </button>
    );
};

export default Button;
